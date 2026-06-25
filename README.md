# Iris KNN Classification — Interactive ML Pipeline
This project is an interactive, browser-based machine learning pipeline built in React (JSX) that classifies Iris flower species using the K-Nearest Neighbors algorithm. It walks through every stage of a supervised learning workflow — from raw data loading to model evaluation — entirely from scratch, with no external ML libraries.
---

## Table of Contents
- [Introduction](#introduction)
- [Features and Objectives](#features-and-objectives)
- [Technologies Used](#technologies-used)
- [Dataset](#dataset)
- [Pipeline Steps](#pipeline-steps)
- [Implementation](#implementation)
- [How to Run](#how-to-run)
- [Results](#results)
---

## Introduction
Built as DecodeLabs Project 2, this app demonstrates a complete supervised learning pipeline implemented in pure JavaScript/React. It aims to:
1. Visualize each stage of the ML pipeline interactively, from data ingestion to predictions.
2. Implement KNN, Gaussian Naive Bayes, and Decision Tree classifiers from scratch without scikit-learn.
3. Allow live experimentation — users can tune K, adjust the train/test split, enter custom measurements, and run cross-validation in real time.
---

## Features and Objectives
- **Interactive Step Navigator**:
  - 10-step guided pipeline that walks through the entire ML workflow.
  - Each step is independently explorable with live controls.

- **KNN Classifier (from scratch)**:
  - Euclidean distance-based neighbor search.
  - Configurable K (1–21) via a slider with an elbow curve chart updating live.
  - Nearest neighbor table with distances and vote distribution for any custom input.

- **Feature Scaling**:
  - StandardScaler (z-score normalization) implemented in JavaScript.
  - Visual comparison of raw vs. scaled feature ranges.

- **Train/Test Split**:
  - Seeded shuffle to remove class-ordering bias.
  - Adjustable test ratio (10%–40%) with live class distribution display.

- **Algorithm Comparison**:
  - KNN vs. Gaussian Naive Bayes vs. Decision Tree (depth-4, Gini impurity).
  - Side-by-side confusion matrices and per-class F1 bars.

- **K-Fold Cross Validation**:
  - Configurable folds (3–10), mean accuracy, and standard deviation.
  - Per-fold bar chart and score distribution scatter.

- **Feature Importance**:
  - Permutation importance: accuracy drop when each feature is shuffled.
  - Interactive scatter plot explorer with selectable X/Y feature axes.

- **Live Prediction**:
  - Four sliders (one per feature) for custom input.
  - Real-time species prediction, confidence score, vote distribution, and nearest neighbor table.
  - Quick presets for typical Setosa, Versicolor, Virginica, and an ambiguous edge case.

- **Report Card**:
  - Full precision, recall, F1, and support table per class.
  - Algorithm comparison summary with macro-averaged metrics.
---

## Technologies Used
- **Language**: JavaScript (JSX / React)
- **Libraries**:
  - React (hooks: `useState`, `useEffect`, `useRef`)
  - HTML5 Canvas (scatter plots)
  - SVG (elbow curve, score distribution)
- **Environment**: Browser (Claude Artifact / React renderer)
- **No external ML libraries** — KNN, Naive Bayes, and Decision Tree are all hand-coded
---

## Dataset
The classic Iris dataset, embedded directly in the file.
- **Samples**: 150 (50 per class, perfectly balanced)
- **Features**: 4 numerical measurements (all in cm)
  - Sepal Length
  - Sepal Width
  - Petal Length
  - Petal Width
- **Classes**: Iris Setosa, Iris Versicolor, Iris Virginica
- **Missing values**: None
- **Source**: Originally collected by Ronald Fisher (1936)
---

## Pipeline Steps
| Step | Name | Description |
|---|---|---|
| 1 | Load Data | Dataset overview, sample table, and Petal Length × Width scatter plot |
| 2 | Scale Features | StandardScaler visualization — raw vs. normalized feature ranges |
| 3 | Split Data | Shuffled train/test split with adjustable ratio and class distribution |
| 4 | Train KNN | K tuning slider, per-class F1 cards, and K vs. F1 elbow curve |
| 5 | Evaluate | Accuracy, Macro F1, confusion matrix, and per-class F1 bars |
| 6 | Predict | Live custom input → real-time prediction with neighbor breakdown |
| 7 | Compare Algos | KNN vs. Naive Bayes vs. Decision Tree — metrics and confusion matrices |
| 8 | Cross Validate | K-Fold CV with fold-by-fold accuracy bars and score distribution |
| 9 | Feature Analysis | Permutation importance + interactive scatter plot feature explorer |
| 10 | Report Card | Full classification report with precision, recall, F1, and support |
---

## Implementation
1. **Algorithms (from scratch)**:
   - `knnPredict` — Euclidean distance, sorted neighbors, majority vote.
   - `trainNaiveBayes` / `nbPredict` — Gaussian likelihood with log-probability to avoid underflow.
   - `buildTree` / `treePredict1` — Recursive decision tree with Gini impurity splits, max depth 4.

2. **Preprocessing**:
   - `standardize()` — computes mean and std on training data, applies the same transform to test data to prevent data leakage.
   - `shuffle()` — seeded linear congruential generator for reproducible random shuffles.

3. **Evaluation**:
   - `calcMetrics()` — builds a 3×3 confusion matrix and computes per-class precision, recall, and F1.
   - `kFoldCV()` — stratified K-fold cross-validation loop returning mean and standard deviation.

4. **Feature Importance**:
   - Permutation importance: each feature is shuffled independently and the resulting accuracy drop is recorded as its importance score.

5. **Visualization**:
   - Canvas-based scatter plots re-render on every state change.
   - SVG elbow curve and fold distribution chart update live as K and folds are adjusted.
---

## How to Run
** — Local React environment**
# Clone the repository
git clone https://github.com/RonakKumar9753/Project-2.git
cd Project-2

# Set up a React project (e.g. with Vite)
npm create vite@latest iris-knn -- --template react
cd iris-knn

# Replace src/App.jsx with iris_knn_project.jsx
cp ../iris_knn_project.jsx src/App.jsx

# Install dependencies and start
npm install
npm run dev
```
---

## Results
- KNN achieves high accuracy on the Iris dataset, with Iris Setosa classified perfectly due to its linear separability.
- Versicolor and Virginica share overlapping feature space, leading to occasional boundary misclassifications that decrease as K is tuned.
- Petal Length and Petal Width emerge as the most discriminative features via permutation importance; Sepal Width contributes minimally.
- Cross-validation confirms the model is stable — low standard deviation across folds indicates the result is not a lucky split.
- All three classifiers (KNN, Naive Bayes, Decision Tree) perform competitively on this dataset, with differences becoming more apparent on the ambiguous Versicolor/Virginica boundary.
