const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    colors: [12, 19, 3, 5, 60, 3]
};

//generate the chart
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data.labels,
        datasets: [{
            label: '# of Votes',
            data: data.colors,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// export function
function exportToExcel() {

    var workbook = new $.ig.excel.Workbook($.ig.excel.WorkbookFormat.excel2007);
    var sheet = workbook.worksheets().add('Sheet1');

    sheet.columns(0).setWidth(96, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(4).setWidth(80, $.ig.excel.WorksheetColumnWidthUnit.pixel);
    sheet.columns(6).setWidth(96, $.ig.excel.WorksheetColumnWidthUnit.pixel);

    // Format some rows and columns 
    sheet.rows(0).cellFormat().font().bold(true);

    sheet.getCell('A1').value('Color');
    sheet.getCell('B1').value('Value');

    // Populate the sheet with data  
    for (var i = 0; i < data.labels.length; i++) {
        var label = data.labels[i];
        var color = data.colors[i];
        var rowIndex = i + 2; // start from line 2 

        // Assign label to the 'A' column and color to the 'B' column
        sheet.getCell('A' + rowIndex).value(label);
        sheet.getCell('B' + rowIndex).value(color);
    }
    // Save the workbook
    saveWorkbook(workbook, "Chart Data.xlsx");
}
// Save the workbook function
function saveWorkbook(workbook, name) {
    workbook.save({ type: 'blob' }, function (data) {
        console.log("data", data);
        saveAs(data, name);
    }, function (error) {
        alert('Error exporting: : ' + error);
    });
}