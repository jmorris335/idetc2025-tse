const inputContainer = document.getElementById('input-container');
const submitButton = document.getElementById('submit-button');
const resultsTableBody = document.querySelector('#results-table tbody');

// Make Parameter Inputs
const inputs = [];

const col1 = document.createElement('div');
col1.className = 'col-group1'

const col2 = document.createElement('div');
col2.className = 'col-group2'

let input_groups = Array()
param_info.forEach(param => {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.textContent = `${param.label}`;

    const flexRow = document.createElement('div');
    flexRow.className = 'flex-row';

    const range = document.createElement('input');
    range.type = 'range';
    range.min = param.min;
    range.max = param.max;
    range.step = (param.max - param.min) / 50;

    const number = document.createElement('input');
    number.id = param.name;
    number.type = 'number';
    number.min = param.min;
    number.max = param.max;
    number.step = (param.max - param.min) / 50;

    // Sync values
    range.addEventListener('input', () => {
    number.value = range.value;
    });

    number.addEventListener('input', () => {
    range.value = number.value;
    });

    // Initial sync
    const initial_value = (param.max - param.min) / 2 + param.min;
    range.value = initial_value;
    number.value = initial_value;

    inputs.push(number);

    flexRow.appendChild(range);
    flexRow.appendChild(number);
    group.appendChild(label);
    group.appendChild(flexRow);

    if (param.column == 0) {
        col1.appendChild(group);
    }
    else {
        col2.appendChild(group);
    }
})

const input_flex_row = document.createElement('div');
input_flex_row.className = 'flex-row';
input_flex_row.appendChild(col1);
input_flex_row.appendChild(col2);
inputContainer.appendChild(input_flex_row);

// Make Metric Table
const metric_table = document.createElement('table');
metric_table.className = 'metric-table';
const thead = document.createElement('thead');
const header_row = document.createElement('tr');
metric_names.forEach(name => {
    const th = document.createElement('th');
    th.textContent = name;
    header_row.appendChild(th);
});
thead.appendChild(header_row)
metric_table.appendChild(thead);
metric_table.append(document.createElement('tbody'))
document.getElementById('metric-table').appendChild(metric_table);

// Update Metric Table Results
var form = document.getElementById('form-input');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    params = getParamArray(inputs, form);
    metrics = GVfun(params);

    showMetrics(metrics);
    sendParamstoDB(params, form);
})

function getParamArray(inputs) {
    out = new Array(param_info.length).fill(0);
    inputs.forEach(input => {
        for (let i=0; i < param_info.length; i++) {
            if (param_info[i].name === input.id) {
                var order = param_info[i].order;
                break;
            }
        }
        out[order] = input.value;
    })
    return out;
}

function showMetrics(metrics) {
    const new_row = metric_table.insertRow(1);
    metrics.forEach((metric, index) => {
        const cell = new_row.insertCell();
        color = calcHeatMapColor(metric);
        metric = metric * 100;
        metric = metric.toFixed(1);
        metric = parseInt(metric);
        cell.textContent = metric;
        cell.style = "background-color: ".concat(color, ";");
    });
}

function calcHeatMapColor(value) {
    if (value < 0.1) {
        return '#dc6363ff';
    }
    else if (value < 0.25) {
        return '#ff9f9fff';
    }
    else if (value < 0.4) {
        return '#ffd8d1ff';
    }
    else if (value < 0.6) {
        return '#ffffe3ff';
    }
    else if (value < 0.75) {
        return '#d0fe9fff';
    }
    else if (value < 0.9) {
        return '#8bfb8dff';
    }
    else {
        return '#28cf62ff';
    }
}

function sendParamstoDB(params, form) {
    const formData = new FormData(form);
    formData.append('params', params)

    fetch("process_form.php", {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Handle the successful response
        } else {
            // Handle the error
        }
    })
    .catch(error => {
    // Handle the error
    });
}