import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

//https://www.ag-grid.com/documentation/angular/getting-started/
//https://medium.com/@maxkoretskyi/hey-we-renamed-ag-grid-to-ag-grid-community-so-now-you-need-to-run-1d4793645108

@Component({
  selector: 'app-grid-demo',
  templateUrl: './grid-demo.component.html',
  styleUrls: ['./grid-demo.component.css']
})
export class GridDemoComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'my-app';

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    //this.rowData = this.http.get('https://www.ag-grid.com/example-assets/small-row-data.json');
    this.rowData = this.http.get('https://www.ag-grid.com/example-assets/row-data.json');
  }

  gridOptions = {

  
  columnDefs : [
    {
      headerName: 'Select', field: '', sortable: true, width: 50,
      checkboxSelection: true,
      headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true
    },
    { field: 'make', sortable: true, filter: true, width: 150 },
    { field: 'model', sortable: true, filter: true, width: 150, checkboxSelection: true},
    { field: 'price', sortable: true, filter: true , width: 100}
    ],
  
    rowSelection: 'multiple',
    isRowSelectable: function(row) { return row.data ? row.data.make != 'Ford' : false;}

  }
    /*
    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];*/

    rowData: any;

    getSelectedRows() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data );
      const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');

      alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
