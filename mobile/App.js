import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { timetable } from '../src/lib/timetable-data';
import { syllabusByCode } from '../src/lib/syllabus-data';

const days = Object.keys(timetable);
const apiUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '');
const apkDownloadUrl = 'https://github.com/Code-Ninja007/SmartTimeTable/releases/latest/download/ClassSync.apk';
const excludedSubjects = new Set(['LUNCH', 'Free Period', 'LIBRARY']);
const reminderPreferenceKey = 'classsync-reminders-scheduled-v2';
const notificationChannelId = 'class-notifications-v2';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function getCurrentDay() {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  return days.includes(today) ? today : days[0];
}

function parseTime(timeLabel, date = new Date()) {
  const [clock, modifier] = timeLabel.split(' ');
  let [hours, minutes] = clock.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function getTimeRemaining(period, day, currentTime) {
  if (new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentTime) !== day) {
    return null;
  }
  const [startLabel, endLabel] = period.time.split(' - ');
  const end = parseTime(endLabel, currentTime);
  if (currentTime < parseTime(startLabel, currentTime) || currentTime >= end) return null;
  const seconds = Math.max(0, Math.floor((end.getTime() - currentTime.getTime()) / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')} left`;
}

function getActivePeriod(periods, day, currentTime) {
  if (new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentTime) !== day) {
    return null;
  }

  return periods.find((period) => {
    const [startLabel, endLabel] = period.time.split(' - ');
    return currentTime >= parseTime(startLabel, currentTime) && currentTime < parseTime(endLabel, currentTime);
  }) ?? null;
}

async function configureClassReminders() {
  await Notifications.setNotificationChannelAsync(notificationChannelId, {
    name: 'Class reminders and timers',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
    vibrationPattern: [0, 250, 250, 250],
  });

  let permission = await Notifications.getPermissionsAsync();
  if (permission.status !== 'granted') {
    permission = await Notifications.requestPermissionsAsync();
  }
  if (permission.status !== 'granted') return false;
  if (await AsyncStorage.getItem(reminderPreferenceKey)) return true;

  await Notifications.cancelAllScheduledNotificationsAsync();

  const weekdayNumbers = {
    Sunday: 1,
    Monday: 2,
    Tuesday: 3,
    Wednesday: 4,
    Thursday: 5,
    Friday: 6,
    Saturday: 7,
  };

  for (const [day, periods] of Object.entries(timetable)) {
    for (const period of periods) {
      if (excludedSubjects.has(period.subject)) continue;
      const [startLabel] = period.time.split(' - ');
      const reminderTime = parseTime(startLabel);
      reminderTime.setMinutes(reminderTime.getMinutes() - 5);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Class starts in 5 minutes',
          body: period.subject,
          sound: 'default',
          priority: 'high',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          channelId: notificationChannelId,
          weekday: weekdayNumbers[day],
          hour: reminderTime.getHours(),
          minute: reminderTime.getMinutes(),
        },
      });
    }
  }

  await AsyncStorage.setItem(reminderPreferenceKey, 'true');
  return true;
}

function ActionButton({ icon, label, onPress, color }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={19} color={color} />
    </Pressable>
  );
}

function SyllabusContent({ syllabus }) {
  if (!syllabus) return null;

  return (
    <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalScrollContent}>
      {syllabus.units?.map((unit) => (
        <View key={unit.title} style={styles.unitCard}>
          <Text style={styles.unitTitle}>{unit.title}</Text>
          {unit.topics.map((topic) => (
            <View key={topic} style={styles.topicRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>
      ))}
      {syllabus.sections?.map((section) => (
        <View key={section.title} style={styles.unitCard}>
          <Text style={styles.unitTitle}>{section.title}</Text>
          {section.topics.map((topic) => (
            <View key={topic} style={styles.topicRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

function ClassDialog({ dialog, onClose, day, period, notes, onNotesChange, onSaveNotes }) {
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const syllabus = period ? syllabusByCode[period.code] : null;

  useEffect(() => {
    setSuggestions(null);
    setError('');
    if (dialog !== 'ai' || !period) return undefined;

    let cancelled = false;
    const load = async () => {
      if (!apiUrl) {
        setError('Study suggestions are not configured yet.');
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/suggestions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject: period.subject }),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || `The suggestions service returned ${response.status}.`);
        }
        if (!Array.isArray(result.resources) || !Array.isArray(result.studyTips)) {
          throw new Error('The suggestions service returned an invalid response.');
        }
        if (!cancelled) setSuggestions(result);
      } catch (requestError) {
        if (!cancelled) setError(requestError.message || 'Could not load suggestions. Please try again.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [dialog, period]);

  const visible = dialog !== null && period !== null;
  const title = dialog === 'syllabus'
    ? syllabus?.title ?? period?.subject
    : dialog === 'notes'
      ? 'Notes & Reminders'
      : 'AI Study Assistant';

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeading}>
              <Text style={styles.modalTitle}>{title}</Text>
              <Text style={styles.modalSubtitle}>
                {dialog === 'ai' ? `Study resources and tips for ${period?.subject}` : `${period?.code} · ${day}`}
              </Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={23} color="#334155" />
            </Pressable>
          </View>

          {dialog === 'syllabus' && <SyllabusContent syllabus={syllabus} />}

          {dialog === 'notes' && (
            <View style={styles.notesContent}>
              <TextInput
                multiline
                textAlignVertical="top"
                placeholder="Add your notes, homework reminders, or deadlines here..."
                placeholderTextColor="#94a3b8"
                value={notes}
                onChangeText={onNotesChange}
                style={styles.notesInput}
              />
              <Pressable style={styles.saveButton} onPress={onSaveNotes}>
                <Text style={styles.saveButtonText}>Save notes</Text>
              </Pressable>
            </View>
          )}

          {dialog === 'ai' && (
            <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalScrollContent}>
              {isLoading && <ActivityIndicator size="large" color="#3478c5" />}
              {!!error && <Text style={styles.errorText}>{error}</Text>}
              {suggestions && (
                <>
                  <View style={styles.unitCard}>
                    <Text style={styles.unitTitle}>Suggested Resources</Text>
                    {suggestions.resources.map((resource, index) => (
                      <View key={`${index}-${resource}`} style={styles.topicRow}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.topicText}>{resource}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.unitCard}>
                    <Text style={styles.unitTitle}>Study Tips</Text>
                    {suggestions.studyTips.map((tip, index) => (
                      <View key={`${index}-${tip}`} style={styles.topicRow}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.topicText}>{tip}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

function ClassCard({ period, day, currentTime, onOpen }) {
  const remainingTime = getTimeRemaining(period, day, currentTime);
  const isInteractive = !excludedSubjects.has(period.subject);
  let iconName = 'book-open-variant';
  if (period.subject === 'LUNCH') {
    iconName = 'silverware-fork-knife';
  } else if (period.code === 'BCS502' || period.code === 'BCS552') {
    iconName = 'web';
  } else if (period.icon === 'FlaskConical') {
    iconName = 'flask-outline';
  } else if (period.icon === 'Cpu') {
    iconName = 'memory';
  } else if (period.icon === 'Network') {
    iconName = 'graph-outline';
  } else if (period.icon === 'FolderKanban') {
    iconName = 'folder-outline';
  }

  return (
    <View style={[styles.classCard, !isInteractive && styles.breakCard, remainingTime && styles.activeCard]}>
      <View style={styles.classMain}>
        <View style={styles.classIcon}>
          <MaterialCommunityIcons name={iconName} size={26} color="#3478c5" />
        </View>
        <View style={styles.classInfo}>
          <Text style={styles.classTitle}>{period.subject}</Text>
          <Text style={styles.classTime}>{period.time}</Text>
          <Text style={styles.classCode}>{period.type ? `${period.type} ` : ''}({period.code})</Text>
        </View>
        <View style={styles.classActions}>
          {remainingTime && <Text style={styles.remainingTime}>{remainingTime}</Text>}
          {isInteractive && (
            <View style={styles.actionRow}>
              <ActionButton
                icon="book-outline"
                label={`View syllabus for ${period.subject}`}
                onPress={() => onOpen('syllabus', period)}
                color="#3478c5"
              />
              <ActionButton
                icon="create-outline"
                label={`View notes for ${period.subject}`}
                onPress={() => onOpen('notes', period)}
                color="#e3941a"
              />
              <ActionButton
                icon="bulb-outline"
                label={`Get study tips for ${period.subject}`}
                onPress={() => onOpen('ai', period)}
                color="#eab308"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dialog, setDialog] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [notes, setNotes] = useState('');
  const [notesKey, setNotesKey] = useState('');
  const [notificationsReady, setNotificationsReady] = useState(false);
  const periods = useMemo(() => timetable[selectedDay] ?? [], [selectedDay]);
  const activePeriod = useMemo(
    () => getActivePeriod(periods, selectedDay, currentTime),
    [periods, selectedDay, currentTime],
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      configureClassReminders()
        .then(setNotificationsReady)
        .catch((error) => console.warn('Could not schedule local class reminders:', error));
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web' || !notificationsReady || !activePeriod) return undefined;

    let cancelled = false;
    let notificationId;
    const [, endLabel] = activePeriod.time.split(' - ');
    const now = new Date();
    const endTime = parseTime(endLabel, now);

    if (endTime <= now) return undefined;

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Period complete',
        body: `${activePeriod.subject} has ended.`,
        sound: 'default',
        priority: 'high',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: endTime,
        channelId: notificationChannelId,
      },
    }).then((id) => {
      if (cancelled) {
        return Notifications.cancelScheduledNotificationAsync(id);
      }
      notificationId = id;
      return undefined;
    }).catch((error) => {
      console.warn('Could not schedule the current-period timer notification:', error);
    });

    return () => {
      cancelled = true;
      if (notificationId && Date.now() < endTime.getTime()) {
        Notifications.cancelScheduledNotificationAsync(notificationId).catch((error) => {
          console.warn('Could not cancel the previous period timer notification:', error);
        });
      }
    };
  }, [notificationsReady, activePeriod?.code, activePeriod?.subject, activePeriod?.time]);

  const openDialog = async (nextDialog, period) => {
    setSelectedPeriod(period);
    setDialog(nextDialog);
    if (nextDialog === 'notes') {
      const key = `classsync-notes-${selectedDay}-${period.code}`;
      setNotesKey(key);
      try {
        setNotes((await AsyncStorage.getItem(key)) ?? '');
      } catch (error) {
        Alert.alert('Could not load notes', 'Local notes storage is unavailable.');
      }
    }
  };

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem(notesKey, notes);
      setDialog(null);
    } catch (error) {
      Alert.alert('Could not save notes', 'Check that your device has available storage and try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.brand}>
          <Ionicons name="book" size={28} color="#3478c5" />
          <Text style={styles.brandTitle}>ClassSync</Text>
        </View>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Open IERP - Kanpur Institute of Technology | AKTU Code: 165"
          onPress={() => Linking.openURL('https://erp.kit.ac.in')}
          style={({ pressed }) => [styles.logoLink, pressed && styles.pressed]}
        >
          <Image source={require('./assets/kit-erp-logo.png')} style={styles.logo} resizeMode="contain" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.pageContent}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayList}>
          {days.map((day) => (
            <Pressable
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]}
            >
              <Text style={[styles.dayButtonText, selectedDay === day && styles.selectedDayText]}>{day}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleTitle}>{selectedDay}</Text>
          <Text style={styles.dateLabel}>
            {currentTime.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
          </Text>
        </View>

        <View style={styles.classList}>
          {periods.map((period) => (
            <ClassCard
              key={`${selectedDay}-${period.time}`}
              period={period}
              day={selectedDay}
              currentTime={currentTime}
              onOpen={openDialog}
            />
          ))}
        </View>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Download the latest ClassSync Android app"
          onPress={() => {
            Linking.openURL(apkDownloadUrl).catch((error) => {
              console.warn('Could not open the ClassSync APK download page:', error);
              Alert.alert('Download unavailable', 'Could not open the APK download link.');
            });
          }}
          style={({ pressed }) => [styles.downloadLink, pressed && styles.pressed]}
        >
          <Ionicons name="download-outline" size={17} color="#3478c5" />
          <Text style={styles.downloadLinkText}>Download ClassSync for Android</Text>
        </Pressable>
        <Text style={styles.footerText}>Notes are saved only on this device.</Text>
      </ScrollView>

      <ClassDialog
        dialog={dialog}
        onClose={() => setDialog(null)}
        day={selectedDay}
        period={selectedPeriod}
        notes={notes}
        onNotesChange={setNotes}
        onSaveNotes={saveNotes}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  header: {
    minHeight: 64,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f7fb',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  brandTitle: {
    color: '#182230',
    fontSize: 22,
    fontWeight: '700',
  },
  logoLink: {
    width: 124,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 44,
  },
  pageContent: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  dayList: {
    gap: 8,
    paddingBottom: 16,
  },
  dayButton: {
    minHeight: 40,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#e9eef5',
  },
  selectedDayButton: {
    backgroundColor: '#3478c5',
  },
  dayButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedDayText: {
    color: '#ffffff',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 8,
    marginBottom: 12,
  },
  scheduleTitle: {
    color: '#172033',
    fontSize: 20,
    fontWeight: '700',
  },
  dateLabel: {
    color: '#64748b',
    fontSize: 13,
  },
  classList: {
    gap: 12,
  },
  classCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e1e7ef',
    backgroundColor: '#ffffff',
    shadowColor: '#102a43',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  breakCard: {
    backgroundColor: '#f0f2f5',
  },
  activeCard: {
    borderColor: '#3478c5',
    borderWidth: 2,
  },
  classMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  classIcon: {
    width: 34,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classInfo: {
    flex: 1,
    gap: 4,
  },
  classTitle: {
    color: '#182230',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
  },
  classTime: {
    color: '#64748b',
    fontSize: 13,
  },
  classCode: {
    marginTop: 2,
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
  },
  classActions: {
    alignItems: 'flex-end',
  },
  remainingTime: {
    marginBottom: 3,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#e8f2ff',
    color: '#2464a3',
    fontSize: 11,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  pressed: {
    opacity: 0.65,
  },
  footerText: {
    paddingTop: 22,
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 12,
  },
  downloadLink: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 22,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  downloadLinkText: {
    color: '#3478c5',
    fontSize: 13,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.48)',
  },
  modalCard: {
    width: '100%',
    maxWidth: 580,
    maxHeight: '88%',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    minHeight: 76,
    paddingLeft: 18,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  modalHeading: {
    flex: 1,
    paddingVertical: 12,
  },
  modalTitle: {
    paddingRight: 8,
    color: '#172033',
    fontSize: 19,
    fontWeight: '700',
  },
  modalSubtitle: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 12,
    lineHeight: 17,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    maxHeight: 560,
  },
  modalScrollContent: {
    gap: 12,
    padding: 16,
  },
  unitCard: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#fbfcfe',
  },
  unitTitle: {
    marginBottom: 10,
    color: '#1f2937',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    marginBottom: 8,
  },
  bullet: {
    color: '#3478c5',
    fontSize: 16,
    lineHeight: 22,
  },
  topicText: {
    flex: 1,
    color: '#526174',
    fontSize: 13,
    lineHeight: 20,
  },
  notesContent: {
    padding: 16,
    gap: 12,
  },
  notesInput: {
    minHeight: 220,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d7dee8',
    borderRadius: 10,
    color: '#182230',
    fontSize: 15,
    lineHeight: 21,
  },
  saveButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#3478c5',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  errorText: {
    padding: 12,
    color: '#b42318',
    textAlign: 'center',
    fontSize: 14,
  },
});
