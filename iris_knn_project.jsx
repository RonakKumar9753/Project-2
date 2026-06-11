import { useState, useEffect, useRef } from "react";

const iris = {
  data: [
    [5.1,3.5,1.4,0.2],[4.9,3.0,1.4,0.2],[4.7,3.2,1.3,0.2],[4.6,3.1,1.5,0.2],[5.0,3.6,1.4,0.2],
    [5.4,3.9,1.7,0.4],[4.6,3.4,1.4,0.3],[5.0,3.4,1.5,0.2],[4.4,2.9,1.4,0.2],[4.9,3.1,1.5,0.1],
    [5.4,3.7,1.5,0.2],[4.8,3.4,1.6,0.2],[4.8,3.0,1.4,0.1],[4.3,3.0,1.1,0.1],[5.8,4.0,1.2,0.2],
    [5.7,4.4,1.5,0.4],[5.4,3.9,1.3,0.4],[5.1,3.5,1.4,0.3],[5.7,3.8,1.7,0.3],[5.1,3.8,1.5,0.3],
    [5.4,3.4,1.7,0.2],[5.1,3.7,1.5,0.4],[4.6,3.6,1.0,0.2],[5.1,3.3,1.7,0.5],[4.8,3.4,1.9,0.2],
    [5.0,3.0,1.6,0.2],[5.0,3.4,1.6,0.4],[5.2,3.5,1.5,0.2],[5.2,3.4,1.4,0.2],[4.7,3.2,1.6,0.2],
    [4.8,3.1,1.6,0.2],[5.4,3.4,1.5,0.4],[5.2,4.1,1.5,0.1],[5.5,4.2,1.4,0.2],[4.9,3.1,1.5,0.1],
    [5.0,3.2,1.2,0.2],[5.5,3.5,1.3,0.2],[4.9,3.1,1.5,0.1],[4.4,3.0,1.3,0.2],[5.1,3.4,1.5,0.2],
    [5.0,3.5,1.3,0.3],[4.5,2.3,1.3,0.3],[4.4,3.2,1.3,0.2],[5.0,3.5,1.6,0.6],[5.1,3.8,1.9,0.4],
    [4.8,3.0,1.4,0.3],[5.1,3.8,1.6,0.2],[4.6,3.2,1.4,0.2],[5.3,3.7,1.5,0.2],[5.0,3.3,1.4,0.2],
    [7.0,3.2,4.7,1.4],[6.4,3.2,4.5,1.5],[6.9,3.1,4.9,1.5],[5.5,2.3,4.0,1.3],[6.5,2.8,4.6,1.5],
    [5.7,2.8,4.5,1.3],[6.3,3.3,4.7,1.6],[4.9,2.4,3.3,1.0],[6.6,2.9,4.6,1.3],[5.2,2.7,3.9,1.4],
    [5.0,2.0,3.5,1.0],[5.9,3.0,4.2,1.5],[6.0,2.2,4.0,1.0],[6.1,2.9,4.7,1.4],[5.6,2.9,3.6,1.3],
    [6.7,3.1,4.4,1.4],[5.6,3.0,4.5,1.5],[5.8,2.7,4.1,1.0],[6.2,2.2,4.5,1.5],[5.6,2.5,3.9,1.1],
    [5.9,3.2,4.8,1.8],[6.1,2.8,4.0,1.3],[6.3,2.5,4.9,1.5],[6.1,2.8,4.7,1.2],[6.4,2.9,4.3,1.3],
    [6.6,3.0,4.4,1.4],[6.8,2.8,4.8,1.4],[6.7,3.0,5.0,1.7],[6.0,2.9,4.5,1.5],[5.7,2.6,3.5,1.0],
    [5.5,2.4,3.8,1.1],[5.5,2.4,3.7,1.0],[5.8,2.7,3.9,1.2],[6.0,2.7,5.1,1.6],[5.4,3.0,4.5,1.5],
    [6.0,3.4,4.5,1.6],[6.7,3.1,4.7,1.5],[6.3,2.3,4.4,1.3],[5.6,3.0,4.1,1.3],[5.5,2.5,4.0,1.3],
    [5.5,2.6,4.4,1.2],[6.1,3.0,4.6,1.4],[5.8,2.6,4.0,1.2],[5.0,2.3,3.3,1.0],[5.6,2.7,4.2,1.3],
    [5.7,3.0,4.2,1.2],[5.7,2.9,4.2,1.3],[6.2,2.9,4.3,1.3],[5.1,2.5,3.0,1.1],[5.7,2.8,4.1,1.3],
    [6.3,3.3,6.0,2.5],[5.8,2.7,5.1,1.9],[7.1,3.0,5.9,2.1],[6.3,2.9,5.6,1.8],[6.5,3.0,5.8,2.2],
    [7.6,3.0,6.6,2.1],[4.9,2.5,4.5,1.7],[7.3,2.9,6.3,1.8],[6.7,2.5,5.8,1.8],[7.2,3.6,6.1,2.5],
    [6.5,3.2,5.1,2.0],[6.4,2.7,5.3,1.9],[6.8,3.0,5.5,2.1],[5.7,2.5,5.0,2.0],[5.8,2.8,5.1,2.4],
    [6.4,3.2,5.3,2.3],[6.5,3.0,5.5,1.8],[7.7,3.8,6.7,2.2],[7.7,2.6,6.9,2.3],[6.0,2.2,5.0,1.5],
    [6.9,3.2,5.7,2.3],[5.6,2.8,4.9,2.0],[7.7,2.8,6.7,2.0],[6.3,2.7,4.9,1.8],[6.7,3.3,5.7,2.1],
    [7.2,3.2,6.0,1.8],[6.2,2.8,4.8,1.8],[6.1,3.0,4.9,1.8],[6.4,2.8,5.6,2.1],[7.2,3.0,5.8,1.6],
    [7.4,2.8,6.1,1.9],[7.9,3.8,6.4,2.0],[6.4,2.8,5.6,2.2],[6.3,2.8,5.1,1.5],[6.1,2.6,5.6,1.4],
    [7.7,3.0,6.1,2.3],[6.3,3.4,5.6,2.4],[6.4,3.1,5.5,1.8],[6.0,3.0,4.8,1.8],[6.9,3.1,5.4,2.1],
    [6.7,3.1,5.6,2.4],[6.9,3.1,5.1,2.3],[5.8,2.7,5.1,1.9],[6.8,3.2,5.9,2.3],[6.7,3.3,5.7,2.5],
    [6.7,3.0,5.2,2.3],[6.3,2.5,5.0,1.9],[6.5,3.0,5.2,2.0],[6.2,3.4,5.4,2.3],[5.9,3.0,5.1,1.8]
  ],
  labels: [...Array(50).fill(0), ...Array(50).fill(1), ...Array(50).fill(2)],
  names: ["Setosa", "Versicolor", "Virginica"],
  features: ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"],
  units: ["cm","cm","cm","cm"],
  ranges: [[4.3,7.9],[2.0,4.4],[1.0,6.9],[0.1,2.5]]
};

// ─── Utilities ───────────────────────────────────────────────────────────────
function standardize(data) {
  const n = data[0].length;
  const means = Array(n).fill(0), stds = Array(n).fill(0);
  data.forEach(row => row.forEach((v, i) => (means[i] += v)));
  means.forEach((_, i) => (means[i] /= data.length));
  data.forEach(row => row.forEach((v, i) => (stds[i] += (v - means[i]) ** 2)));
  stds.forEach((_, i) => (stds[i] = Math.sqrt(stds[i] / data.length) || 1));
  return { scaled: data.map(row => row.map((v, i) => (v - means[i]) / stds[i])), means, stds };
}

function euclidean(a, b) {
  return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
}

function shuffle(data, labels, seed = 42) {
  const arr = data.map((d, i) => ({ d, l: labels[i] }));
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return { data: arr.map(x => x.d), labels: arr.map(x => x.l) };
}

function calcMetrics(preds, testY) {
  const cm = Array.from({ length: 3 }, () => Array(3).fill(0));
  preds.forEach((p, i) => cm[testY[i]][p]++);
  const f1s = [0, 1, 2].map(cls => {
    const tp = cm[cls][cls];
    const fp = cm.reduce((s, r, ri) => s + (ri !== cls ? r[cls] : 0), 0);
    const fn = cm[cls].reduce((s, v, j) => s + (j !== cls ? v : 0), 0);
    const p = tp + fp > 0 ? tp / (tp + fp) : 0;
    const r = tp + fn > 0 ? tp / (tp + fn) : 0;
    return p + r > 0 ? (2 * p * r) / (p + r) : 0;
  });
  const macro_f1 = f1s.reduce((s, v) => s + v, 0) / 3;
  const acc = preds.filter((p, i) => p === testY[i]).length / preds.length;
  return { cm, f1s, macro_f1, acc };
}

// ─── KNN ────────────────────────────────────────────────────────────────────
function knnPredict(trainX, trainY, testX, k) {
  return testX.map(point => {
    const dists = trainX.map((row, i) => ({ d: euclidean(row, point), label: trainY[i] }));
    dists.sort((a, b) => a.d - b.d);
    const votes = [0, 0, 0];
    dists.slice(0, k).forEach(({ label }) => votes[label]++);
    return votes.indexOf(Math.max(...votes));
  });
}

function knnPredictSingle(trainX, trainY, point, k) {
  const dists = trainX.map((row, i) => ({ d: euclidean(row, point), label: trainY[i], idx: i }));
  dists.sort((a, b) => a.d - b.d);
  const neighbors = dists.slice(0, k);
  const votes = [0, 0, 0];
  neighbors.forEach(({ label }) => votes[label]++);
  const pred = votes.indexOf(Math.max(...votes));
  const conf = votes[pred] / k;
  return { pred, conf, votes, neighbors };
}

// ─── Naive Bayes (Gaussian) ──────────────────────────────────────────────────
function trainNaiveBayes(trainX, trainY) {
  const classes = [0, 1, 2];
  const model = {};
  classes.forEach(c => {
    const rows = trainX.filter((_, i) => trainY[i] === c);
    const n = rows.length;
    const nFeatures = rows[0].length;
    const means = Array(nFeatures).fill(0);
    const vars = Array(nFeatures).fill(0);
    rows.forEach(row => row.forEach((v, fi) => (means[fi] += v)));
    means.forEach((_, fi) => (means[fi] /= n));
    rows.forEach(row => row.forEach((v, fi) => (vars[fi] += (v - means[fi]) ** 2)));
    vars.forEach((_, fi) => (vars[fi] = vars[fi] / n + 1e-9));
    model[c] = { means, vars, prior: n / trainX.length };
  });
  return model;
}

function nbPredict(model, testX) {
  return testX.map(point => {
    const logProbs = [0, 1, 2].map(c => {
      let lp = Math.log(model[c].prior);
      point.forEach((v, fi) => {
        const mu = model[c].means[fi], sig2 = model[c].vars[fi];
        lp += -0.5 * Math.log(2 * Math.PI * sig2) - ((v - mu) ** 2) / (2 * sig2);
      });
      return lp;
    });
    return logProbs.indexOf(Math.max(...logProbs));
  });
}

// ─── Decision Tree (depth 3) ─────────────────────────────────────────────────
function gini(labels) {
  if (!labels.length) return 0;
  const counts = [0, 0, 0];
  labels.forEach(l => counts[l]++);
  return 1 - counts.reduce((s, c) => s + (c / labels.length) ** 2, 0);
}

function bestSplit(X, Y) {
  let bestGain = -Infinity, bestFeat = 0, bestThresh = 0;
  const baseGini = gini(Y);
  for (let fi = 0; fi < X[0].length; fi++) {
    const vals = [...new Set(X.map(r => r[fi]))].sort((a, b) => a - b);
    for (let t = 0; t < vals.length - 1; t++) {
      const thresh = (vals[t] + vals[t + 1]) / 2;
      const left = Y.filter((_, i) => X[i][fi] <= thresh);
      const right = Y.filter((_, i) => X[i][fi] > thresh);
      if (!left.length || !right.length) continue;
      const gain = baseGini - (left.length / Y.length) * gini(left) - (right.length / Y.length) * gini(right);
      if (gain > bestGain) { bestGain = gain; bestFeat = fi; bestThresh = thresh; }
    }
  }
  return { feat: bestFeat, thresh: bestThresh, gain: bestGain };
}

function buildTree(X, Y, depth = 0, maxDepth = 4) {
  const counts = [0, 0, 0];
  Y.forEach(l => counts[l]++);
  const leaf = counts.indexOf(Math.max(...counts));
  if (depth >= maxDepth || new Set(Y).size === 1 || Y.length < 5)
    return { leaf, counts };
  const { feat, thresh, gain } = bestSplit(X, Y);
  if (gain <= 0) return { leaf, counts };
  const leftIdx = X.map((r, i) => r[feat] <= thresh ? i : -1).filter(i => i >= 0);
  const rightIdx = X.map((r, i) => r[feat] > thresh ? i : -1).filter(i => i >= 0);
  return {
    feat, thresh,
    left: buildTree(leftIdx.map(i => X[i]), leftIdx.map(i => Y[i]), depth + 1, maxDepth),
    right: buildTree(rightIdx.map(i => X[i]), rightIdx.map(i => Y[i]), depth + 1, maxDepth)
  };
}

function treePredict1(node, x) {
  if (node.leaf !== undefined) return node.leaf;
  return x[node.feat] <= node.thresh ? treePredict1(node.left, x) : treePredict1(node.right, x);
}

// ─── Cross-Validation ────────────────────────────────────────────────────────
function kFoldCV(k_cv, k_knn) {
  const { data: sd, labels: sl } = shuffle(iris.data, iris.labels);
  const { scaled } = standardize(sd);
  const foldSize = Math.floor(scaled.length / k_cv);
  const scores = [];
  for (let fold = 0; fold < k_cv; fold++) {
    const testStart = fold * foldSize;
    const testEnd = testStart + foldSize;
    const testX = scaled.slice(testStart, testEnd);
    const testY = sl.slice(testStart, testEnd);
    const trainX = [...scaled.slice(0, testStart), ...scaled.slice(testEnd)];
    const trainY = [...sl.slice(0, testStart), ...sl.slice(testEnd)];
    const preds = knnPredict(trainX, trainY, testX, k_knn);
    const acc = preds.filter((p, i) => p === testY[i]).length / preds.length;
    scores.push(acc);
  }
  const mean = scores.reduce((s, v) => s + v, 0) / scores.length;
  const std = Math.sqrt(scores.reduce((s, v) => s + (v - mean) ** 2, 0) / scores.length);
  return { scores, mean, std };
}

// ─── Pipeline ────────────────────────────────────────────────────────────────
function runPipeline(k, testRatio) {
  const { data: sd, labels: sl } = shuffle(iris.data, iris.labels);
  const { scaled, means, stds } = standardize(sd);
  const split = Math.floor(scaled.length * (1 - testRatio));
  const trainX = scaled.slice(0, split), trainY = sl.slice(0, split);
  const testX = scaled.slice(split), testY = sl.slice(split);
  const preds = knnPredict(trainX, trainY, testX, k);
  const { cm, f1s, macro_f1, acc } = calcMetrics(preds, testY);
  // NB
  const nbModel = trainNaiveBayes(trainX, trainY);
  const nbPreds = nbPredict(nbModel, testX);
  const nb = calcMetrics(nbPreds, testY);
  // DT
  const dtTree = buildTree(trainX, trainY);
  const dtPreds = testX.map(x => treePredict1(dtTree, x));
  const dt = calcMetrics(dtPreds, testY);
  // Permutation importance
  const baseAcc = acc;
  const importance = trainX[0].map((_, fi) => {
    const shuffled = testX.map(row => {
      const r = [...row];
      const vals = testX.map(x => x[fi]);
      let s = 77 + fi;
      for (let i = vals.length - 1; i > 0; i--) {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        const j = Math.abs(s) % (i + 1);
        [vals[i], vals[j]] = [vals[j], vals[i]];
      }
      r[fi] = vals[testX.indexOf(row)] ?? row[fi];
      return r;
    });
    const shPreds = knnPredict(trainX, trainY, shuffled, k);
    const shAcc = shPreds.filter((p, i) => p === testY[i]).length / shPreds.length;
    return Math.max(0, baseAcc - shAcc);
  });
  return { cm, f1s, macro_f1, acc, trainSize: split, testSize: scaled.length - split, preds, testY, trainX, trainY, means, stds, nb, dt, importance };
}

const COLORS = ["#1D9E75", "#185FA5", "#D85A30"];
const LIGHT_COLORS = ["#E1F5EE", "#E6F1FB", "#FAECE7"];
const BORDER_COLORS = ["#9FE1CB", "#B5D4F4", "#F5C4B3"];

const STEPS = [
  { label: "Load Data", icon: "ti-database" },
  { label: "Scale Features", icon: "ti-ruler" },
  { label: "Split Data", icon: "ti-git-branch" },
  { label: "Train KNN", icon: "ti-brain" },
  { label: "Evaluate", icon: "ti-chart-bar" },
  { label: "Predict", icon: "ti-wand" },
  { label: "Compare Algos", icon: "ti-git-compare" },
  { label: "Cross Validate", icon: "ti-refresh" },
  { label: "Feature Analysis", icon: "ti-chart-dots" },
  { label: "Report Card", icon: "ti-certificate" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function MetricCard({ value, label }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "1rem", textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 500 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function F1Bars({ f1s }) {
  return iris.names.map((n, i) => (
    <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div style={{ width: 76, fontSize: 12, color: COLORS[i] }}>{n}</div>
      <div style={{ flex: 1, height: 10, background: "var(--color-background-secondary)", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ width: `${f1s[i] * 100}%`, height: "100%", background: COLORS[i], borderRadius: 5, transition: "width 0.4s" }} />
      </div>
      <div style={{ width: 44, fontSize: 12, fontWeight: 500, color: COLORS[i] }}>{(f1s[i] * 100).toFixed(1)}%</div>
    </div>
  ));
}

function ConfMatrix({ cm }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ padding: "6px 10px", textAlign: "left", color: "var(--color-text-tertiary)", fontWeight: 400, fontSize: 11 }}>Actual ↓ / Pred →</th>
            {iris.names.map((n, i) => <th key={n} style={{ padding: "6px 10px", textAlign: "center", color: COLORS[i], fontWeight: 500 }}>{n}</th>)}
          </tr>
        </thead>
        <tbody>
          {cm.map((row, ri) => (
            <tr key={ri}>
              <td style={{ padding: "6px 10px", color: COLORS[ri], fontWeight: 500 }}>{iris.names[ri]}</td>
              {row.map((v, ci) => (
                <td key={ci} style={{
                  padding: "8px 14px", textAlign: "center", fontWeight: ri === ci ? 500 : 400,
                  background: ri === ci ? LIGHT_COLORS[ri] : v > 0 ? "#fff8f6" : "transparent",
                  color: ri === ci ? COLORS[ri] : v > 0 ? COLORS[2] : "var(--color-text-tertiary)",
                  border: "0.5px solid var(--color-border-tertiary)"
                }}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [k, setK] = useState(5);
  const [testRatio, setTestRatio] = useState(0.2);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const [kHistory, setKHistory] = useState([]);
  const [cvFolds, setCvFolds] = useState(5);
  const [cvResult, setCvResult] = useState(null);
  const [customInput, setCustomInput] = useState([5.1, 3.5, 1.4, 0.2]);
  const [predResult, setPredResult] = useState(null);
  const [featX, setFeatX] = useState(2);
  const [featY, setFeatY] = useState(3);
  const canvasRef = useRef(null);
  const scatterRef = useRef(null);

  useEffect(() => {
    const r = runPipeline(k, testRatio);
    setResult(r);
    setKHistory(prev => {
      const exists = prev.find(x => x.k === k);
      if (exists) return prev.map(x => x.k === k ? { k, f1: r.macro_f1 } : x);
      return [...prev, { k, f1: r.macro_f1 }].sort((a, b) => a.k - b.k);
    });
  }, [k, testRatio]);

  useEffect(() => {
    const cv = kFoldCV(cvFolds, k);
    setCvResult(cv);
  }, [cvFolds, k]);

  useEffect(() => {
    if (!result) return;
    const scaled = customInput.map((v, i) => (v - result.means[i]) / result.stds[i]);
    const p = knnPredictSingle(result.trainX, result.trainY, scaled, k);
    setPredResult(p);
  }, [customInput, result, k]);

  // Scatter canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const { data } = iris;
    const xs = data.map(r => r[2]), ys = data.map(r => r[3]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const pad = 28;
    const scX = v => pad + ((v - minX) / (maxX - minX)) * (W - 2 * pad);
    const scY = v => H - pad - ((v - minY) / (maxY - minY)) * (H - 2 * pad);
    data.forEach((row, i) => {
      const cls = iris.labels[i];
      ctx.beginPath();
      ctx.arc(scX(row[2]), scY(row[3]), 4.5, 0, 2 * Math.PI);
      ctx.fillStyle = COLORS[cls];
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }, []);

  // Feature scatter canvas (step 8)
  useEffect(() => {
    const canvas = scatterRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const { data } = iris;
    const xs = data.map(r => r[featX]), ys = data.map(r => r[featY]);
    const minX = Math.min(...xs) - 0.3, maxX = Math.max(...xs) + 0.3;
    const minY = Math.min(...ys) - 0.3, maxY = Math.max(...ys) + 0.3;
    const pad = 28;
    const scX = v => pad + ((v - minX) / (maxX - minX)) * (W - 2 * pad);
    const scY = v => H - pad - ((v - minY) / (maxY - minY)) * (H - 2 * pad);
    data.forEach((row, i) => {
      const cls = iris.labels[i];
      ctx.beginPath();
      ctx.arc(scX(row[featX]), scY(row[featY]), 4.5, 0, 2 * Math.PI);
      ctx.fillStyle = COLORS[cls];
      ctx.globalAlpha = 0.75;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    // draw custom input point
    if (result) {
      const cx = customInput[featX], cy = customInput[featY];
      ctx.beginPath();
      ctx.arc(scX(cx), scY(cy), 8, 0, 2 * Math.PI);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();
      if (predResult) {
        ctx.fillStyle = COLORS[predResult.pred];
        ctx.fill();
      }
    }
  }, [featX, featY, customInput, predResult, result]);

  const Card = ({ children, style = {} }) => (
    <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", ...style }}>
      {children}
    </div>
  );

  const SectionNote = ({ children }) => (
    <div style={{ marginTop: "1rem", padding: "12px 16px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", fontSize: 13, color: "var(--color-text-secondary)" }}>
      {children}
    </div>
  );

  return (
    <div style={{ padding: "1.5rem 1rem", fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}>
      <h2 className="sr-only">Iris KNN Classification — Project 2</h2>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 20, fontWeight: 500 }}>Iris KNN Classification</span>
        <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", background: "var(--color-background-secondary)", padding: "2px 8px", borderRadius: "var(--border-radius-md)" }}>Project 2</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>DecodeLabs · Batch 2026 · Supervised Learning Pipeline</p>

      {/* Step Nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {STEPS.map((s, i) => (
          <button key={s.label} onClick={() => setStep(i)} style={{
            padding: "5px 12px", fontSize: 12, borderRadius: "var(--border-radius-md)",
            border: step === i ? `2px solid ${COLORS[0]}` : "0.5px solid var(--color-border-secondary)",
            background: step === i ? LIGHT_COLORS[0] : "var(--color-background-primary)",
            color: step === i ? "#0F6E56" : "var(--color-text-primary)",
            cursor: "pointer", fontWeight: step === i ? 500 : 400,
            display: "flex", alignItems: "center", gap: 5
          }}>
            <i className={`ti ${s.icon}`} aria-hidden="true" style={{ fontSize: 13 }} />
            {i + 1}. {s.label}
          </button>
        ))}
      </div>

      {/* Global Controls bar */}
      <div style={{ display: "flex", gap: 24, marginBottom: "1.5rem", flexWrap: "wrap", padding: "10px 14px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>K = {k}</label>
          <input type="range" min={1} max={21} step={2} value={k} onChange={e => setK(Number(e.target.value))} style={{ flex: 1 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>Test {Math.round(testRatio * 100)}%</label>
          <input type="range" min={10} max={40} step={5} value={Math.round(testRatio * 100)} onChange={e => setTestRatio(Number(e.target.value) / 100)} style={{ flex: 1 }} />
        </div>
        {result && (
          <div style={{ display: "flex", gap: 16 }}>
            {[["Acc", (result.acc * 100).toFixed(1) + "%"], ["F1", (result.macro_f1 * 100).toFixed(1) + "%"]].map(([l, v]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{v}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{l}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Step 0: Load Data ──────────────────────────────────────────── */}
      {step === 0 && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            The Iris dataset: 150 balanced samples × 4 features → 3 species classes. First collected by Ronald Fisher in 1936.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
            {[["150", "Total Samples"], ["3", "Classes"], ["4", "Features"], ["50", "Per Class"], ["0", "Missing Values"]].map(([v, l]) => (
              <MetricCard key={l} value={v} label={l} />
            ))}
          </div>
          <Card style={{ marginBottom: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "6px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", gap: 4 }}>
              <span>Species</span>{iris.features.map(f => <span key={f}>{f.split(" ")[0]}.</span>)}
            </div>
            {[0, 50, 100].map(start => iris.data.slice(start, start + 3).map((row, ri) => (
              <div key={start + ri} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "6px 0", fontSize: 13, borderBottom: "0.5px solid var(--color-border-tertiary)", gap: 4, alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[iris.labels[start + ri]], display: "inline-block" }} />
                  {iris.names[iris.labels[start + ri]]}
                </span>
                {row.map((v, vi) => <span key={vi} style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>{v}</span>)}
              </div>
            )))}
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", paddingTop: 8 }}>Showing 3 samples per class (9 of 150)</div>
          </Card>
          <canvas ref={canvasRef} width={620} height={200}
            style={{ width: "100%", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)" }}
            role="img" aria-label="Scatter plot: Petal Length vs Petal Width by species" />
          <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
            {iris.names.map((n, i) => (
              <span key={n} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--color-text-secondary)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i] }} />{n}
              </span>
            ))}
            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>Petal Length × Petal Width</span>
          </div>
        </div>
      )}

      {/* ── Step 1: Scale Features ──────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            KNN is distance-based. Without scaling, features with larger ranges dominate the Euclidean distance. StandardScaler normalizes to mean=0, variance=1.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1rem" }}>
            {["Raw (Biased)", "StandardScaled (Balanced)"].map((title, ti) => (
              <Card key={title}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>{title}</div>
                {iris.features.map((f, fi) => {
                  const vals = iris.data.map(r => r[fi]);
                  const min = Math.min(...vals), max = Math.max(...vals);
                  const { scaled } = standardize(iris.data);
                  const svals = scaled.map(r => r[fi]);
                  const smin = Math.min(...svals).toFixed(1), smax = Math.max(...svals).toFixed(1);
                  const barWidth = ti === 0 ? ((max - min) / 7) * 100 : 80;
                  return (
                    <div key={f} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                        <span style={{ color: "var(--color-text-secondary)" }}>{f}</span>
                        <span style={{ color: "var(--color-text-tertiary)" }}>{ti === 0 ? `${min.toFixed(1)}–${max.toFixed(1)} cm` : `${smin} – ${smax}`}</span>
                      </div>
                      <div style={{ height: 6, background: "var(--color-background-secondary)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${Math.min(barWidth, 100)}%`, height: "100%", background: ti === 0 ? COLORS[2] : COLORS[0], borderRadius: 3 }} />
                      </div>
                    </div>
                  );
                })}
              </Card>
            ))}
          </div>
          <SectionNote>
            <strong style={{ color: "var(--color-text-primary)" }}>Formula:</strong> z = (x − μ) / σ &nbsp;·&nbsp; Fit only on training data, then apply the same transform to test data to prevent data leakage.
          </SectionNote>
        </div>
      )}

      {/* ── Step 2: Split Data ──────────────────────────────────────────── */}
      {step === 2 && result && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            Shuffle first to remove ordering bias (the dataset is sorted by class). Then split into training (pattern recognition) and test (validation) sets.
          </p>
          <div style={{ display: "flex", height: 40, borderRadius: "var(--border-radius-md)", overflow: "hidden", marginBottom: "1rem" }}>
            <div style={{ flex: result.trainSize, background: COLORS[1], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 500 }}>
              Train: {result.trainSize} ({100 - Math.round(testRatio * 100)}%)
            </div>
            <div style={{ flex: result.testSize, background: COLORS[2], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 500 }}>
              Test: {result.testSize} ({Math.round(testRatio * 100)}%)
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
            {[
              ["Training set", result.trainSize, "The model learns patterns from this data. Never used for final evaluation.", COLORS[1]],
              ["Test set (locked)", result.testSize, "Held back until final evaluation. Simulates real unseen data.", COLORS[2]]
            ].map(([title, n, desc, c]) => (
              <Card key={title} style={{ border: `2px solid ${c}` }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
                <div style={{ fontSize: 22, fontWeight: 500, margin: "6px 0", color: c }}>{n} samples</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{desc}</div>
              </Card>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Class distribution after split</div>
          {[0, 1, 2].map(cls => {
            const trainCount = result.trainY.filter(l => l === cls).length;
            const total = result.trainSize;
            return (
              <div key={cls} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 76, fontSize: 12, color: COLORS[cls] }}>{iris.names[cls]}</div>
                <div style={{ flex: 1, height: 8, background: "var(--color-background-secondary)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(trainCount / total) * 100}%`, height: "100%", background: COLORS[cls], borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", minWidth: 40 }}>{trainCount} / {total}</div>
              </div>
            );
          })}
          <SectionNote>
            A balanced split (roughly equal class proportions in train and test) is ideal. Use <code>stratify=y</code> in scikit-learn to guarantee this.
          </SectionNote>
        </div>
      )}

      {/* ── Step 3: Train KNN ───────────────────────────────────────────── */}
      {step === 3 && result && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            KNN stores all training points, then classifies a new point by majority vote from its K nearest neighbors. Adjust K below to see the effect.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            {iris.names.map((n, i) => (
              <div key={n} style={{ background: LIGHT_COLORS[i], border: `0.5px solid ${BORDER_COLORS[i]}`, borderRadius: "var(--border-radius-lg)", padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: 12, color: COLORS[i], fontWeight: 500 }}>{n}</div>
                <div style={{ fontSize: 20, fontWeight: 500, margin: "6px 0", color: COLORS[i] }}>{(result.f1s[i] * 100).toFixed(1)}%</div>
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>F1 Score</div>
              </div>
            ))}
          </div>
          {kHistory.length > 1 && (
            <Card style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10, color: "var(--color-text-secondary)" }}>K vs Macro F1 — elbow curve (explore by moving K slider)</div>
              <div style={{ position: "relative", height: 130 }}>
                <svg width="100%" height="100%" viewBox="0 0 580 110" preserveAspectRatio="none" role="img" aria-label="Line chart of K value vs F1 score">
                  {kHistory.map((point, i) => {
                    if (i === 0) return null;
                    const prev = kHistory[i - 1];
                    const x1 = ((prev.k - 1) / 20) * 560 + 10, x2 = ((point.k - 1) / 20) * 560 + 10;
                    const y1 = (1 - prev.f1) * 90 + 10, y2 = (1 - point.f1) * 90 + 10;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS[0]} strokeWidth="2" />;
                  })}
                  {kHistory.map((point, i) => (
                    <circle key={i} cx={((point.k - 1) / 20) * 560 + 10} cy={(1 - point.f1) * 90 + 10}
                      r={point.k === k ? 7 : 4} fill={point.k === k ? COLORS[2] : COLORS[0]} />
                  ))}
                </svg>
                <div style={{ position: "absolute", top: 4, right: 8, fontSize: 11, color: "var(--color-text-tertiary)" }}>
                  K={k}: {(result.macro_f1 * 100).toFixed(1)}% ·
                  Best K={kHistory.reduce((b, x) => x.f1 > b.f1 ? x : b, kHistory[0]).k}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 4 }}>
                <span>K=1 (overfit)</span><span>K=21 (underfit)</span>
              </div>
            </Card>
          )}
          <SectionNote>
            <strong style={{ color: "var(--color-text-primary)" }}>Key insight:</strong> K=1 memorises the training set (high variance). Large K smooths the decision boundary but may underfit (high bias). The optimal K minimises both.
          </SectionNote>
        </div>
      )}

      {/* ── Step 4: Evaluate ────────────────────────────────────────────── */}
      {step === 4 && result && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            Evaluation on held-out test data. Accuracy alone can be misleading — use the F1 score and confusion matrix for the full picture.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
            <MetricCard value={(result.acc * 100).toFixed(1) + "%"} label="Accuracy" />
            <MetricCard value={(result.macro_f1 * 100).toFixed(1) + "%"} label="Macro F1" />
            <MetricCard value={result.testSize} label="Test samples" />
            <MetricCard value={k} label="K neighbors" />
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Confusion matrix</div>
          <div style={{ marginBottom: "1.5rem" }}><ConfMatrix cm={result.cm} /></div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Per-class F1</div>
          <F1Bars f1s={result.f1s} />
          <SectionNote>
            <strong style={{ color: "var(--color-text-primary)" }}>Insight:</strong> Setosa is linearly separable — perfect F1. Versicolor and Virginica share feature space, so misclassifications occur there. KNN tuning and better K reduce those boundary errors.
          </SectionNote>
        </div>
      )}

      {/* ── Step 5: Predict ─────────────────────────────────────────────── */}
      {step === 5 && result && predResult && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            Enter your own measurements and watch the trained KNN model predict the species in real time.
          </p>
          {/* Prediction result banner */}
          <div style={{
            background: LIGHT_COLORS[predResult.pred],
            border: `2px solid ${COLORS[predResult.pred]}`,
            borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem",
            display: "flex", alignItems: "center", gap: 16, marginBottom: "1.5rem"
          }}>
            <div style={{ fontSize: 32 }}>
              {["🌸", "🌼", "🌺"][predResult.pred]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: COLORS[predResult.pred], fontWeight: 500, marginBottom: 2 }}>Predicted species</div>
              <div style={{ fontSize: 22, fontWeight: 500, color: COLORS[predResult.pred] }}>Iris {iris.names[predResult.pred]}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>
                Confidence: {(predResult.conf * 100).toFixed(0)}% ({predResult.votes[predResult.pred]}/{k} neighbors agree)
              </div>
            </div>
            <div>
              <div style={{ display: "flex", gap: 6 }}>
                {predResult.votes.map((v, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: LIGHT_COLORS[i], border: `1.5px solid ${COLORS[i]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, color: COLORS[i] }}>{v}</div>
                    <div style={{ fontSize: 9, color: "var(--color-text-tertiary)", marginTop: 2 }}>{iris.names[i].slice(0, 3)}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", textAlign: "center", marginTop: 4 }}>vote distribution</div>
            </div>
          </div>

          {/* Sliders */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem 1.5rem", marginBottom: "1.5rem" }}>
            {iris.features.map((f, fi) => (
              <div key={f}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <label style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{f}</label>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{customInput[fi].toFixed(1)} cm</span>
                </div>
                <input type="range"
                  min={iris.ranges[fi][0]} max={iris.ranges[fi][1]} step={0.1}
                  value={customInput[fi]}
                  onChange={e => setCustomInput(prev => { const n = [...prev]; n[fi] = Number(e.target.value); return n; })}
                  style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--color-text-tertiary)" }}>
                  <span>{iris.ranges[fi][0]}</span><span>{iris.ranges[fi][1]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick presets */}
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Quick presets</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {[
              { label: "Typical Setosa", vals: [5.0, 3.4, 1.5, 0.2] },
              { label: "Typical Versicolor", vals: [5.9, 2.9, 4.4, 1.4] },
              { label: "Typical Virginica", vals: [6.7, 3.0, 5.5, 2.1] },
              { label: "Ambiguous edge", vals: [6.1, 2.8, 4.7, 1.2] },
            ].map(({ label, vals }) => (
              <button key={label} onClick={() => setCustomInput(vals)} style={{
                padding: "6px 12px", fontSize: 12, borderRadius: "var(--border-radius-md)",
                border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)",
                cursor: "pointer", color: "var(--color-text-primary)"
              }}>{label}</button>
            ))}
          </div>

          {/* Nearest neighbors table */}
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Top {k} nearest neighbors</div>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr 1fr auto auto", gap: 4, fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", paddingBottom: 6, borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
              <span>#</span><span>SeL</span><span>SeW</span><span>PeL</span><span>PeW</span><span>Class</span><span>Dist</span>
            </div>
            {predResult.neighbors.map((nb, ni) => {
              const origIdx = nb.idx;
              const row = iris.data[origIdx] || iris.data[ni];
              const cls = result.trainY[origIdx] ?? result.trainY[ni];
              return (
                <div key={ni} style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr 1fr auto auto", gap: 4, fontSize: 12, padding: "5px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", alignItems: "center" }}>
                  <span style={{ color: "var(--color-text-tertiary)", width: 16 }}>{ni + 1}</span>
                  {result.trainX[origIdx] ? result.trainX[origIdx].map((v, vi) => <span key={vi} style={{ color: "var(--color-text-secondary)" }}>{v.toFixed(2)}</span>) : [0,1,2,3].map(vi => <span key={vi}>—</span>)}
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: COLORS[cls] }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS[cls] }} />
                    {iris.names[cls].slice(0, 3)}.
                  </span>
                  <span style={{ color: "var(--color-text-tertiary)" }}>{nb.d.toFixed(2)}</span>
                </div>
              );
            })}
          </Card>
        </div>
      )}

      {/* ── Step 6: Compare Algorithms ──────────────────────────────────── */}
      {step === 6 && result && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            How does KNN compare to other classifiers on the same train/test split? All three are run from scratch, no external libraries.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            {[
              { name: "KNN", acc: result.acc, f1: result.macro_f1, desc: `K=${k} neighbors, Euclidean dist.`, color: COLORS[1], f1s: result.f1s },
              { name: "Gaussian Naive Bayes", acc: result.nb.acc, f1: result.nb.macro_f1, desc: "Assumes Gaussian feature distributions", color: COLORS[0], f1s: result.nb.f1s },
              { name: "Decision Tree", acc: result.dt.acc, f1: result.dt.macro_f1, desc: "Depth-4 Gini impurity splits", color: COLORS[2], f1s: result.dt.f1s },
            ].map(({ name, acc, f1, desc, color, f1s: fs }) => {
              const isBest = [result.acc, result.nb.acc, result.dt.acc].every(v => acc >= v);
              return (
                <Card key={name} style={isBest ? { border: `2px solid ${color}` } : {}}>
                  {isBest && <div style={{ fontSize: 11, background: color, color: "#fff", borderRadius: "var(--border-radius-md)", padding: "2px 8px", display: "inline-block", marginBottom: 8 }}>Best accuracy</div>}
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>{desc}</div>
                  <div style={{ display: "flex", gap: 16, marginBottom: "1rem" }}>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 500, color }}>{(acc * 100).toFixed(1)}%</div>
                      <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Accuracy</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 500, color }}>{(f1 * 100).toFixed(1)}%</div>
                      <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Macro F1</div>
                    </div>
                  </div>
                  {iris.names.map((n, i) => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i] }} />
                      <div style={{ flex: 1, height: 5, background: "var(--color-background-secondary)", borderRadius: 2.5, overflow: "hidden" }}>
                        <div style={{ width: `${fs[i] * 100}%`, height: "100%", background: COLORS[i], borderRadius: 2.5 }} />
                      </div>
                      <div style={{ fontSize: 10, color: COLORS[i], minWidth: 32 }}>{(fs[i] * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </Card>
              );
            })}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Confusion matrices — side by side</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[{ name: "KNN", cm: result.cm }, { name: "Naive Bayes", cm: result.nb.cm }, { name: "Decision Tree", cm: result.dt.cm }].map(({ name, cm }) => (
              <div key={name}>
                <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 6, color: "var(--color-text-secondary)" }}>{name}</div>
                <ConfMatrix cm={cm} />
              </div>
            ))}
          </div>
          <SectionNote>
            All three algorithms perform well on Iris because the classes are fairly separable. On messier real-world data, the differences would be more pronounced. KNN struggles at scale (slow at inference), while Naive Bayes is fast but assumes feature independence.
          </SectionNote>
        </div>
      )}

      {/* ── Step 7: Cross Validation ─────────────────────────────────────── */}
      {step === 7 && cvResult && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            A single train/test split can be lucky or unlucky. K-Fold Cross Validation runs the pipeline multiple times, using a different test fold each time, and averages the results.
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Folds: {cvFolds}</label>
            <input type="range" min={3} max={10} step={1} value={cvFolds} onChange={e => setCvFolds(Number(e.target.value))} style={{ display: "block", width: "100%", marginTop: 6 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
            <MetricCard value={(cvResult.mean * 100).toFixed(1) + "%"} label="Mean accuracy" />
            <MetricCard value={"±" + (cvResult.std * 100).toFixed(1) + "%"} label="Std deviation" />
            <MetricCard value={cvFolds} label="Folds" />
            <MetricCard value={k} label="K" />
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Per-fold accuracy</div>
          <Card style={{ marginBottom: "1.5rem" }}>
            {cvResult.scores.map((score, fi) => (
              <div key={fi} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", width: 48 }}>Fold {fi + 1}</div>
                <div style={{ flex: 1, height: 12, background: "var(--color-background-secondary)", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{
                    width: `${score * 100}%`, height: "100%",
                    background: score >= cvResult.mean ? COLORS[0] : COLORS[2],
                    borderRadius: 6, transition: "width 0.4s"
                  }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, minWidth: 42, color: score >= cvResult.mean ? COLORS[0] : COLORS[2] }}>{(score * 100).toFixed(1)}%</div>
              </div>
            ))}
            <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "var(--color-text-secondary)" }}>Mean</span>
              <span style={{ fontWeight: 500 }}>{(cvResult.mean * 100).toFixed(1)}% ± {(cvResult.std * 100).toFixed(1)}%</span>
            </div>
          </Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Distribution of fold scores</div>
          <Card>
            <svg width="100%" height="50" viewBox="0 0 580 50" role="img" aria-label="Distribution of fold accuracy scores">
              {cvResult.scores.map((score, fi) => {
                const x = ((score - 0.8) / 0.25) * 540 + 20;
                return <circle key={fi} cx={Math.max(20, Math.min(560, x))} cy={25} r={7} fill={COLORS[1]} fillOpacity={0.7} />;
              })}
              <line x1={((cvResult.mean - 0.8) / 0.25) * 540 + 20} y1={5} x2={((cvResult.mean - 0.8) / 0.25) * 540 + 20} y2={45} stroke={COLORS[2]} strokeWidth={2} strokeDasharray="4 3" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--color-text-tertiary)" }}>
              <span>80%</span><span>90%</span><span>100%</span>
            </div>
          </Card>
          <SectionNote>
            A low standard deviation (close to ±0%) means your model is stable and the result isn't a fluke. High variance across folds suggests overfitting or insufficient data.
          </SectionNote>
        </div>
      )}

      {/* ── Step 8: Feature Analysis ─────────────────────────────────────── */}
      {step === 8 && result && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            Permutation importance: shuffle one feature at a time and measure the accuracy drop. A bigger drop means that feature matters more.
          </p>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Permutation feature importance</div>
          <Card style={{ marginBottom: "1.5rem" }}>
            {iris.features.map((f, fi) => {
              const imp = result.importance[fi];
              const maxImp = Math.max(...result.importance) || 1;
              return (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 90, fontSize: 12, color: "var(--color-text-secondary)" }}>{f}</div>
                  <div style={{ flex: 1, height: 14, background: "var(--color-background-secondary)", borderRadius: 7, overflow: "hidden" }}>
                    <div style={{ width: `${(imp / maxImp) * 100}%`, height: "100%", background: imp > 0.05 ? COLORS[1] : "var(--color-border-secondary)", borderRadius: 7, transition: "width 0.4s" }} />
                  </div>
                  <div style={{ width: 48, fontSize: 12, fontWeight: 500, textAlign: "right", color: imp > 0.05 ? COLORS[1] : "var(--color-text-tertiary)" }}>
                    {imp < 0.001 ? "~0%" : (imp * 100).toFixed(1) + "%"}
                  </div>
                </div>
              );
            })}
          </Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Feature scatter explorer</div>
          <div style={{ display: "flex", gap: 16, marginBottom: "1rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>X axis:</label>
              <select value={featX} onChange={e => setFeatX(Number(e.target.value))} style={{ fontSize: 12, padding: "4px 8px" }}>
                {iris.features.map((f, i) => <option key={f} value={i}>{f}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Y axis:</label>
              <select value={featY} onChange={e => setFeatY(Number(e.target.value))} style={{ fontSize: 12, padding: "4px 8px" }}>
                {iris.features.map((f, i) => <option key={f} value={i}>{f}</option>)}
              </select>
            </div>
          </div>
          <canvas ref={scatterRef} width={620} height={240}
            style={{ width: "100%", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)" }}
            role="img" aria-label="Scatter plot of selected feature pair" />
          <div style={{ display: "flex", gap: 12, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
            {iris.names.map((n, i) => (
              <span key={n} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--color-text-secondary)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i] }} />{n}
              </span>
            ))}
            {predResult && <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>· Large circle = your custom input (from Predict step)</span>}
          </div>
          <SectionNote>
            Petal Length and Petal Width are the most discriminative features — they separate all three classes clearly. Sepal Width alone is nearly useless for this classification task.
          </SectionNote>
        </div>
      )}

      {/* ── Step 9: Report Card ──────────────────────────────────────────── */}
      {step === 9 && result && cvResult && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            Full pipeline summary — your trained model's performance scorecard.
          </p>
          <div style={{ border: "2px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden", marginBottom: "1.5rem" }}>
            <div style={{ padding: "14px 16px", background: "var(--color-background-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>Model Report — Iris KNN</div>
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>DecodeLabs · Project 2 · KNN Classifier</div>
              </div>
              <div style={{ fontSize: 28 }}>
                {result.macro_f1 >= 0.95 ? "⭐" : result.macro_f1 >= 0.9 ? "🏆" : "📊"}
              </div>
            </div>
            <div style={{ padding: "1rem 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
                <MetricCard value={(result.acc * 100).toFixed(1) + "%"} label="Test accuracy" />
                <MetricCard value={(result.macro_f1 * 100).toFixed(1) + "%"} label="Macro F1" />
                <MetricCard value={(cvResult.mean * 100).toFixed(1) + "%"} label={`${cvFolds}-fold CV mean`} />
                <MetricCard value={"±" + (cvResult.std * 100).toFixed(1) + "%"} label="CV std dev" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Per-class breakdown</div>
              <div style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", overflow: "hidden", marginBottom: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", padding: "6px 10px", background: "var(--color-background-secondary)", gap: 8 }}>
                  <span>Class</span><span>Prec.</span><span>Recall</span><span>F1</span><span>Support</span>
                </div>
                {iris.names.map((n, ci) => {
                  const tp = result.cm[ci][ci];
                  const fp = result.cm.reduce((s, r, ri) => s + (ri !== ci ? r[ci] : 0), 0);
                  const fn = result.cm[ci].reduce((s, v, j) => s + (j !== ci ? v : 0), 0);
                  const prec = tp + fp > 0 ? tp / (tp + fp) : 0;
                  const rec = tp + fn > 0 ? tp / (tp + fn) : 0;
                  const support = result.cm[ci].reduce((s, v) => s + v, 0);
                  return (
                    <div key={n} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", fontSize: 12, padding: "7px 10px", borderTop: "0.5px solid var(--color-border-tertiary)", gap: 8, alignItems: "center" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: COLORS[ci] }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS[ci] }} />{n}
                      </span>
                      <span>{(prec * 100).toFixed(1)}%</span>
                      <span>{(rec * 100).toFixed(1)}%</span>
                      <span style={{ fontWeight: 500, color: COLORS[ci] }}>{(result.f1s[ci] * 100).toFixed(1)}%</span>
                      <span style={{ color: "var(--color-text-tertiary)" }}>{support}</span>
                    </div>
                  );
                })}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", fontSize: 12, padding: "7px 10px", borderTop: "0.5px solid var(--color-border-secondary)", gap: 8, fontWeight: 500, background: "var(--color-background-secondary)" }}>
                  <span>Macro avg</span>
                  <span>—</span><span>—</span>
                  <span style={{ color: COLORS[1] }}>{(result.macro_f1 * 100).toFixed(1)}%</span>
                  <span style={{ color: "var(--color-text-tertiary)" }}>{result.testSize}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Algorithm comparison</div>
              {[
                { name: "KNN", acc: result.acc, f1: result.macro_f1 },
                { name: "Naive Bayes", acc: result.nb.acc, f1: result.nb.macro_f1 },
                { name: "Decision Tree", acc: result.dt.acc, f1: result.dt.macro_f1 },
              ].map(({ name, acc, f1 }) => {
                const best = Math.max(result.acc, result.nb.acc, result.dt.acc);
                return (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 100, fontSize: 12, color: "var(--color-text-secondary)" }}>{name}</div>
                    <div style={{ flex: 1, height: 12, background: "var(--color-background-secondary)", borderRadius: 6, overflow: "hidden" }}>
                      <div style={{ width: `${acc * 100}%`, height: "100%", background: acc === best ? COLORS[0] : COLORS[1], borderRadius: 6, opacity: acc === best ? 1 : 0.5 }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: acc === best ? 500 : 400, color: acc === best ? COLORS[0] : "var(--color-text-secondary)", minWidth: 40 }}>{(acc * 100).toFixed(1)}%</div>
                  </div>
                );
              })}
              <div style={{ marginTop: "1.5rem", padding: "12px 14px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", fontSize: 13 }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Pipeline summary</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 12, color: "var(--color-text-secondary)" }}>
                  {[
                    ["Dataset", "Iris (150 × 4)"],
                    ["Preprocessing", "StandardScaler"],
                    ["Algorithm", `KNN (K=${k})`],
                    ["Split", `${100 - Math.round(testRatio * 100)}% / ${Math.round(testRatio * 100)}%`],
                    ["CV strategy", `${cvFolds}-fold cross-val`],
                    ["Best feature", iris.features[result.importance.indexOf(Math.max(...result.importance))]],
                  ].map(([l, v]) => (
                    <>
                      <span key={l + "l"} style={{ color: "var(--color-text-tertiary)" }}>{l}</span>
                      <span key={l + "v"} style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{v}</span>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "1rem", fontSize: 13, color: "var(--color-text-secondary)", borderTop: "0.5px solid var(--color-border-tertiary)" }}>
            DecodeLabs · Batch 2026 · Project 2 complete ✓
          </div>
        </div>
      )}
    </div>
  );
}
