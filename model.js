function Param(name, label, order, column, min, max) {
    this.name = name;
    this.label = label;
    this.order = order;
    this.column = column;
    this.min = min;
    this.max = max;
}

let param_names = [
    'track_width',
    'wheel_base',
    'roof_height',
    'susp_travel',
    'max_torque',
    'gearing',
    'tire_dia',
    'energy_cap',
    'framerail',
    'bodypanel'
]

let param_labels = [
    ['Track Width (in)', 0],
    ['Wheel Base (in)', 0],
    ['Roof Height (in)', 0],
    ['Suspension Travel (in)', 1],
    ['Max Torque (ft-lbs)', 1],
    ['Driveline Gearing', 1],
    ['Tire Size (in)', 1],
    ['Energy Capacity (kW)', 1],
    ['Frame Rail Wall Thickness (in)', 0],
    ['Body Panel Wall Thickness (in)', 0]
]

const minNmax = [
    [100, 200], //tw
    [100, 200], //wb
    [65, 85], //rh
    [6, 24], //susptravel
    [400, 750], //maxtorque
    [2, 6], //gearing
    [30, 50], //tirediam
    [850, 1700], //energycap
    [0.25, 1], //framerail
    [0.125, 2] //bodypanel
]

const param_info = Array();
for (var i=0; i < param_names.length; i++) {
    param_info.push(new Param(
        param_names[i],
        param_labels[i][0],
        i,
        param_labels[i][1],
        minNmax[i][0],
        minNmax[i][1]
    ))
}

const metric_names = [
    'Top Speed',
    'Acceleration',
    'Off-Road Ability',
    'Operational Range',
    'Low-Speed Maneuverability',
    'Occupant Protection',
    'Maintainability',
    'Rollover Stability',
    'Towing Capacity',
    'Passenger Cabin Space'
]

const weights = [
    [-5,  -5,  -8,  -3,  -8,  -3,  -3,  10,   0,  10],
    [-3,  -5,  -8,  -3,  -8,  -3,  -3,   5,   8,  10],
    [-5,  -5,  -1,  -3,   0,  -3,  -3,  -10,  0,  10],
    [-3,   0,  10,  -1,  -1,  -3,  -5,  -8,   0,  -3],
    [10,  10,   5,  -5,   0,   0,  -8,   0,   5,  -3],
    [-10, 10,  -8,  -5,   3,   0,   0,   0,   8,   0],
    [8,   -8,  10,  -5,  -5,   0,  -5,  -5,  -3,  -1],
    [-1,  -1,   0,  10,   0,   0,   0,   0,   3,  -1],
    [-3,  -3,   3,  -3,   0,   5,  -3,  -3,  10,  -1],
    [-3,  -3,   3,  -3,  -3,  10,  -5,  -5,   0,  -3]
];
const tran_weights = transpose(weights);

const norms = [
    [ 18,  20,  31,  10,   3,  15,   0,  15,  34,  30],
    [-33, -30, -25, -31, -25, -12, -35, -31,  -3, -12]
];

/**
 * Returns a weighted vector of utility metrics
 * @param {Array} params    numeric array of parameters
 * @returns                 length-10 numeric array of utility metrics
 */
function GVfun(params) {
    let norm_params = normalize_array(params, param_info);

    let metrics = Array()
    for (let i=0; i < weights.length; i++) {
        var weighted_val = vectorProd(norm_params, tran_weights[i]);
        weighted_val = (weighted_val - norms[1][i]) / (norms[0][i] - norms[1][i]);;
        metrics.push(weighted_val);
    }

    return metrics;
}

/**
 * Normalizes an array based on a set of minimums and maximums
 * @param {Array} A     numeric array to normalize
 * @param {Array} param_info array of Param objects
 * @returns             numeric array
 */
function normalize_array(A, param_info) {
    let norm_A = Array();
    for (let i = 0; i < A.length; i++) {
        var normalized = (A[i] - param_info[i].min) / (param_info[i].max - param_info[i].min);
        norm_A.push(normalized);
    }
    return norm_A;
}

function vectorProd(A, B) {
    const min_length = Math.min(A.length, B.length);
    out = 0;
    for (let i=0; i<min_length; i++) {
        out = out + A[i] * B[i];
    }
    return out;
}

/**
 * Multiplies two numeric 2D arrays
 * From https://stackoverflow.com/a/61523756/15496939
 * @param {Array} A A numeric array of arrays of size M x N
 * @param {Array} B A numeric array of arrays of size N x P
 * @returns         A numeric array of arrays of size M x P
 */
let MatrixProd = (A, B) =>
  A.map((row, i) =>
    B[0].map((_, j) =>
      row.reduce((acc, _, n) =>
        acc + A[i][n] * B[n][j], 0
      )
    )
  )

/**
 * Transposes a 2D array
 * From https://stackoverflow.com/a/13241545/15496939
 * @param {Array} A an array of arrays
 * @returns         an array of arrays
 */
function transpose(A) {
    return Object.keys(A[0]).map(function(c) {
        return A.map(function(r) { return r[c]; });
    });
}

/**
 * Returns a 2D array for a HTML Table
 * Based on https://stackoverflow.com/a/59358791/15496939
 * @param {String} table_id ID for the HTML Table
 */
function table2array(table_id) {
    let table_rows = document.getElementById(table_id).rows
    let out = []
    for (var i = 0; i < table_rows.length; i++) {
            var el = table_rows[i].children
            var out_row = []
            for (var j = 0; j < el.length; j++) {
                    out_row.push(el[j].innerText);
            }
            out.push(out_row)
    }
    return out
}