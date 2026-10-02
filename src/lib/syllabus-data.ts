export interface SyllabusUnit {
  title: string;
  topics: string[];
}

export interface SyllabusSection {
  title: string;
  topics: string[];
}

export interface CourseSyllabus {
  title: string;
  units?: SyllabusUnit[];
  sections?: SyllabusSection[];
}

export const syllabusByCode: Record<string, CourseSyllabus> = {
  BCS501: {
    title: 'Database Management System',
    units: [
      {
        title: 'Unit I — Database systems and ER modelling',
        topics: [
          'Database system vs. file system; database concepts and architecture; data models, schemas and instances; data independence; database languages and interfaces; DDL, DML and overall database structure.',
          'Entity-Relationship model concepts and notation; mapping constraints; super, candidate and primary keys; generalization and aggregation; reducing ER diagrams to tables; extended ER model and higher-degree relationships.',
        ],
      },
      {
        title: 'Unit II — Relational model and SQL',
        topics: [
          'Relational data model and integrity constraints: entity, referential, key and domain constraints.',
          'Relational algebra and relational calculus, including tuple and domain calculus.',
          'SQL characteristics and advantages; data types and literals; SQL command types and operators; tables, views and indexes; queries, subqueries and aggregate functions.',
          'Insert, update and delete operations; joins, unions, intersection and minus; cursors, triggers, and procedures in SQL/PL SQL.',
        ],
      },
      {
        title: 'Unit III — Database design and normalization',
        topics: [
          'Functional dependencies; first, second, third and Boyce-Codd normal forms (BCNF); inclusion dependence; lossless-join decompositions.',
          'Normalization using functional dependencies (FD), multivalued dependencies (MVD) and join dependencies (JD); alternative approaches to database design.',
        ],
      },
      {
        title: 'Unit IV — Transactions and distributed databases',
        topics: [
          'Transaction systems; testing serializability; serializability of schedules; conflict- and view-serializable schedules; recoverability.',
          'Recovery from transaction failures; log-based recovery; checkpoints; deadlock handling.',
          'Distributed database storage, concurrency control and directory systems.',
        ],
      },
      {
        title: 'Unit V — Concurrency control',
        topics: [
          'Concurrency-control techniques; locking; timestamping protocols; validation-based protocols; multiple granularity; multiversion schemes; recovery with concurrent transactions; Oracle case study.',
        ],
      },
    ],
  },
  BCS502: {
    title: 'Web Technology',
    units: [
      {
        title: 'Unit I — Web, HTML and XML',
        topics: [
          'Introduction and web-development strategies; history of the web and Internet; web protocols; writing web projects; Internet connection, services and tools; client-server computing.',
          'HTML lists, tables, images, frames and forms; XML document type definitions (DTD), schemas and object models; presenting and using XML; DOM and SAX processors.',
        ],
      },
      {
        title: 'Unit II — CSS and page design',
        topics: [
          'Creating style sheets; CSS properties; backgrounds, text formatting and fonts; block elements and objects; lists and tables; CSS IDs and classes; box model, borders, padding and margins.',
          'Advanced CSS: grouping, dimensions, display, positioning, floating, alignment, pseudo-classes, navigation bars, image sprites, attribute selectors and colors; page layouts and site designs.',
        ],
      },
      {
        title: 'Unit III — JavaScript, AJAX and networking',
        topics: [
          'JavaScript documents, forms, statements, functions and objects; introduction to AJAX.',
          'Internet addressing; InetAddress factory and instance methods; TCP/IP client and server sockets; URLs, URL connections and datagrams.',
        ],
      },
      {
        title: 'Unit IV — JavaBeans, Node.js and MongoDB',
        topics: [
          'Creating JavaBeans and JavaBean properties; stateful session, stateless session and entity beans.',
          'Node.js introduction and environment setup; REPL terminal; NPM; callbacks, events and packaging; Express framework and RESTful APIs.',
          'MongoDB databases and collections; inserting, deleting, updating, joining, sorting and querying.',
        ],
      },
      {
        title: 'Unit V — Servlets and JSP',
        topics: [
          'Servlet overview, architecture and lifecycle; HTTP GET and POST requests; redirecting requests; session tracking, cookies and HttpSession.',
          'Java Server Pages: introduction and overview; first JSP example; implicit objects; scripting; standard actions, directives and custom tag libraries.',
        ],
      },
    ],
  },
  BCS503: {
    title: 'Design and Analysis of Algorithm',
    units: [
      {
        title: 'Unit I — Analysis, sorting and order statistics',
        topics: [
          'Algorithms and algorithm analysis; complexity; growth of functions; performance measurements.',
          'Sorting and order statistics: Shell sort, Quick sort, Merge sort and Heap sort; comparison of sorting algorithms; sorting in linear time.',
        ],
      },
      {
        title: 'Unit II — Advanced data structures and divide-and-conquer',
        topics: [
          'Red-Black trees, B-trees, binomial heaps, Fibonacci heaps, tries and skip lists.',
          'Divide-and-conquer, with examples in sorting, matrix multiplication, convex hull and searching.',
        ],
      },
      {
        title: 'Unit III — Greedy methods',
        topics: [
          'Optimal reliability allocation and knapsack; minimum spanning trees using Prim’s and Kruskal’s algorithms.',
          'Single-source shortest paths using Dijkstra’s and Bellman-Ford algorithms.',
        ],
      },
      {
        title: 'Unit IV — Dynamic programming, backtracking and branch-and-bound',
        topics: [
          'Dynamic programming examples including knapsack; all-pairs shortest paths using Warshall’s and Floyd’s algorithms; resource-allocation problem.',
          'Backtracking and branch-and-bound, with travelling salesperson, graph coloring, n-Queens, Hamiltonian cycles and sum-of-subsets examples.',
        ],
      },
      {
        title: 'Unit V — Selected topics',
        topics: [
          'Algebraic computation; Fast Fourier Transform; string matching; theory of NP-completeness; approximation algorithms; randomized algorithms.',
        ],
      },
    ],
  },
  BCS052: {
    title: 'Data Analytics',
    units: [
      {
        title: 'Unit I — Introduction and analytics lifecycle',
        topics: [
          'Sources, nature and characteristics of data; structured, semi-structured and unstructured data; Big Data platforms; need for data analytics; analytic scalability, processes and tools; analysis vs. reporting; modern tools and applications.',
          'Data Analytics lifecycle: roles and phases of discovery, data preparation, model planning, model building, communicating results and operationalization.',
        ],
      },
      {
        title: 'Unit II — Data analysis',
        topics: [
          'Regression and multivariate analysis; Bayesian modelling, inference and networks; support-vector and kernel methods.',
          'Time-series analysis, linear systems and nonlinear dynamics; rule induction; neural-network learning and generalisation; competitive learning; principal component analysis; fuzzy models and decision trees; stochastic search methods.',
        ],
      },
      {
        title: 'Unit III — Mining data streams',
        topics: [
          'Stream concepts, data models and architecture; stream computing; sampling and filtering; counting distinct elements and estimating moments; counting oneness in a window and decaying windows.',
          'Real-Time Analytics Platform applications; case studies in real-time sentiment analysis and stock-market predictions.',
        ],
      },
      {
        title: 'Unit IV — Frequent itemsets and clustering',
        topics: [
          'Mining frequent itemsets and market-based modelling; Apriori; large data sets in main memory; limited-pass algorithms; frequent-itemset counting in streams.',
          'Hierarchical, K-means and high-dimensional clustering; CLIQUE and ProCLUS; frequent-pattern-based methods; non-Euclidean clustering; stream clustering and parallelism.',
        ],
      },
      {
        title: 'Unit V — Frameworks, visualization and R',
        topics: [
          'MapReduce, Hadoop, Pig, Hive, HBase and MapR; sharding, NoSQL databases and S3; Hadoop Distributed File System; visual data-analysis and interaction techniques, systems and applications.',
          'R graphical user interfaces; data import/export; attributes and data types; descriptive statistics; exploratory data analysis; visualization before analysis; analytics for unstructured data.',
        ],
      },
    ],
  },
  BCS055: {
    title: 'Machine Learning Techniques',
    units: [
      {
        title: 'Unit I — Introduction to machine learning',
        topics: [
          'Learning and types of learning; well-defined learning problems; designing a learning system; history of machine learning.',
          'Machine-learning approaches: artificial neural networks, clustering, reinforcement learning, decision-tree learning, Bayesian networks, support-vector machines and genetic algorithms; issues in machine learning; data science vs. machine learning.',
        ],
      },
      {
        title: 'Unit II — Regression, Bayesian learning and SVM',
        topics: [
          'Linear and logistic regression.',
          'Bayes theorem; concept learning; Bayes optimal classifier; Naïve Bayes; Bayesian belief networks; EM algorithm.',
          'Support-vector machines: linear, polynomial and Gaussian kernels; hyperplanes/decision surfaces; properties and issues of SVM.',
        ],
      },
      {
        title: 'Unit III — Decision trees, instance-based learning and neural networks',
        topics: [
          'Decision-tree learning algorithm and inductive bias; inductive inference; entropy and information theory; information gain; ID-3 algorithm; decision-tree learning issues.',
          'k-Nearest Neighbour; locally weighted regression; radial-basis-function networks; case-based learning.',
          'Perceptrons and multilayer perceptrons; gradient descent and delta rule; backpropagation; generalisation; unsupervised learning and SOM algorithm variants.',
        ],
      },
      {
        title: 'Unit IV — Deep learning',
        topics: [
          'Introduction to deep learning and convolutional neural networks; convolutional and fully connected layers, activation functions and pooling; one-dimensional and two-dimensional convolution; network training.',
          'Case studies listed in the syllabus include diabetic-retinopathy CNNs, smart speakers and self-driving cars.',
        ],
      },
      {
        title: 'Unit V — Reinforcement learning and genetic algorithms',
        topics: [
          'Reinforcement-learning introduction and learning tasks; practical examples; Markov decision process; Q-learning function and algorithm; applications and deep Q-learning.',
          'Genetic algorithms: components, reproduction cycle, crossover and mutation; genetic programming; models of evolution and learning; applications.',
        ],
      },
    ],
  },
  BNC502: {
    title: 'Essence of Indian Traditional Knowledge',
    units: [
      {
        title: 'Module 1 — Society, state and polity in India',
        topics: [
          'State in ancient India: evolutionary, force, mystical and contract theories; stages of state formation; kingship; council of ministers and administration; political ideals and welfare of societies; seven limbs of the state.',
          'Ancient Indian society: Purushartha, Varnashrama and stages of life; marriage; gender as a social category; women in historical traditions and challenges faced by women; four-class classification and slavery.',
        ],
      },
      {
        title: 'Module 2 — Indian literature, culture, tradition and practices',
        topics: [
          'Evolution of scripts and languages: Harappan and Brahmi scripts.',
          'Vedas, Upanishads, Ramayana, Mahabharata and Puranas; Buddhist and Jain literature in Pali, Prakrit and Sanskrit; Kautilya’s Arthashastra and Sanskrit authors.',
          'Telugu, Kannada, Malayalam and Sangam literature; Northern Indian languages and literature; Persian, Urdu and Hindi literature.',
        ],
      },
      {
        title: 'Module 3 — Indian religion, philosophy and practices',
        topics: [
          'Pre-Vedic and Vedic religions; Buddhism, Jainism and the six systems of Indian philosophy; Shankaracharya and philosophical doctrines; heterodox sects.',
          'Bhakti and Sufi movements; nineteenth-century socio-religious reform movements; modern religious practices.',
        ],
      },
      {
        title: 'Module 4 — Science, management and Indian Knowledge System',
        topics: [
          'Astronomy, chemistry, mathematics, physics, agriculture, medicine, metallurgy, geography and biology in India.',
          'Harappan technologies; water, textile and writing technologies; pyrotechnics; trade in ancient India and India’s dominance up to pre-colonial times.',
        ],
      },
      {
        title: 'Module 5 — Cultural heritage and performing arts',
        topics: [
          'Indian architecture, engineering and architecture in ancient India; sculptures, seals, coins and pottery.',
          'Puppetry, dance, music, theatre and drama, painting and martial-arts traditions; fairs and festivals; current developments in arts; India’s cultural contribution to the world; Indian cinema.',
        ],
      },
    ],
  },
  BCS551: {
    title: 'Database Management Systems Lab',
    sections: [
      {
        title: 'Database setup and modelling',
        topics: [
          'Install Oracle/MySQL.',
          'Create Entity-Relationship diagrams using CASE tools.',
        ],
      },
      {
        title: 'SQL and database design',
        topics: [
          'Write basic SELECT statements; restrict and sort data; display data from multiple tables; aggregate data using group functions; manipulate data; create and manage tables.',
          'Normalization.',
        ],
      },
      {
        title: 'PL/SQL programming',
        topics: [
          'Create cursors, procedures, functions, packages and triggers.',
        ],
      },
      {
        title: 'Database applications and recovery',
        topics: [
          'Design and implement payroll-processing, library-information and student-information systems.',
          'Automatic backup and recovery of files.',
        ],
      },
      {
        title: 'Mini-project options',
        topics: [
          'Design and develop a data and application project: inventory control, material requirement processing, hospital management, railway reservation, personal information, web-based user identification, timetable management or hotel management system.',
        ],
      },
    ],
  },
  BCS552: {
    title: 'Web Technology Lab',
    sections: [
      {
        title: 'HTML, XML and responsive design',
        topics: [
          'Build an institute website displaying departmental information.',
          'Create an HTML entry form for student, employee or faculty details.',
          'Develop a responsive website using CSS and HTML.',
          'Create XML with a DTD and display it using a CSS/XSL style sheet.',
        ],
      },
      {
        title: 'JavaScript and validation',
        topics: [
          'Use HTML and JavaScript to validate input data.',
        ],
      },
      {
        title: 'JavaBeans, Node.js and MongoDB',
        topics: [
          'Create a JavaBean for employee information.',
          'Build a Node.js command-line utility.',
          'Use MongoDB aggregation to group, filter and sort data.',
        ],
      },
      {
        title: 'Servlets, JSP and session tracking',
        topics: [
          'Create a servlet exercise for cookie-based login validation.',
          'Connect Servlet/JSP applications to a database to store and display registration data; authenticate users using database records.',
          'Implement a simple shopping cart using the session-tracking API.',
        ],
      },
    ],
  },
  BCS553: {
    title: 'Design and Analysis of Algorithm Lab',
    sections: [
      {
        title: 'Searching and sorting',
        topics: [
          'Recursive binary and linear search; Heap sort; Merge sort; Selection sort; Insertion sort; Quick sort.',
          'Measure Quick sort and Merge sort time complexity for varied input sizes; compare best-, average- and worst-case behaviour.',
        ],
      },
      {
        title: 'Greedy algorithms and graphs',
        topics: [
          'Knapsack using a greedy solution; travelling salesperson problem.',
          'Minimum spanning tree using Kruskal’s and Prim’s algorithms; use Union-Find with Kruskal’s algorithm.',
          'Find shortest paths from a vertex in a weighted connected graph using Dijkstra’s algorithm.',
        ],
      },
      {
        title: 'Dynamic programming and backtracking',
        topics: [
          '0/1 Knapsack using dynamic programming and greedy methods.',
          'All-pairs shortest paths using Floyd’s algorithm; travelling salesperson using dynamic programming.',
          'Implement N-Queens; find subsets with a specified sum; find Hamiltonian cycles in a connected undirected graph using backtracking.',
        ],
      },
    ],
  },
  SDC501: {
    title: 'Quantitative Aptitude',
  },
  SDC502: {
    title: 'Verbal Ability',
  },
  SDC503: {
    title: 'Logical Reasoning',
  },
  BAS104: {
    title: 'Environment and Ecology',
  },
  BCS554: {
    title: 'Mini Project or Internship Assessment',
  },
};
