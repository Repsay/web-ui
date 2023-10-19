import { faEdit, faTrash, faHomeAlt, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { environment } from './../../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';

import { AlertService } from 'src/app/core/_services/shared/alert.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../../core/_services/main.config';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-crackers',
  templateUrl: './crackers.component.html'
})
@PageTitle(['Show Crackers'])
export class CrackersComponent implements OnInit, OnDestroy {

  faEdit=faEdit;
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faEye=faEye;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crackerType: any = [];

  constructor(
    private alert: AlertService,
    private gs: GlobalService,
    ) { }

  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {
    const params = {'maxResults': this.maxResults, 'expand': 'crackerVersions'}

    this.gs.getAll(SERV.CRACKERS_TYPES,params).subscribe((type: any) => {
      this.crackerType = type.values;
      this.dtTrigger.next(void 0);
    });
    const self = this;
    this.dtOptions = {
      dom: 'Bfrtip',
      scrollX: true,
      pageLength: 25,
      lengthMenu: [
          [10, 25, 50, 100, 250, -1],
          [10, 25, 50, 100, 250, 'All']
      ],
      stateSave: true,
      select: true,
      buttons: {
        dom: {
          button: {
            className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
          }
        },
      buttons: [
        {
          text: '↻',
          autoClose: true,
          action: function (e, dt, node, config) {
            self.onRefresh();
          }
        },
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
            {
              extend: 'excelHtml5',
              exportOptions: {
                columns: [0, 1, 2]
              },
            },
            {
              extend: 'print',
              exportOptions: {
                columns: [0, 1, 2]
              },
              customize: function ( win ) {
                $(win.document.body)
                    .css( 'font-size', '10pt' )
                $(win.document.body).find( 'table' )
                    .addClass( 'compact' )
                    .css( 'font-size', 'inherit' );
             }
            },
            {
              extend: 'csvHtml5',
              exportOptions: {modifier: {selected: true}},
              select: true,
              customize: function (dt, csv) {
                let data = "";
                for (let i = 0; i < dt.length; i++) {
                  data = "Crackers\n\n"+  dt;
                }
                return data;
             }
            },
              'copy'
            ]
          }
        ],
      }
    };
  }

  onRefresh(){
    this.rerender();
    this.ngOnInit();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      setTimeout(() => {
        this.dtTrigger['new'].next();
      });
    });
  }

  onDelete(id: number, name: string){
    this.alert.deleteConfirmation(name,'Crackers').then((confirmed) => {
      if (confirmed) {
        // Deletion
        this.gs.delete(SERV.CRACKERS_TYPES, id).subscribe(() => {
          // Successful deletion
          this.alert.okAlert(`Deleted Cracker ${name}`, '');
          this.onRefreshTable(); // Refresh the table
        });
      } else {
        // Handle cancellation
        this.alert.okAlert(`Cracker ${name} is safe!`,'');
      }
    });
  }

  onRefreshTable(){
    setTimeout(() => {
      this.ngOnInit();
      this.rerender();  // rerender datatables
    },2000);
  }

}
