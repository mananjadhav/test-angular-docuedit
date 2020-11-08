import { Component, ViewChild, OnInit } from '@angular/core';
import { ToolbarService, DocumentEditorContainer } from '@syncfusion/ej2-angular-documenteditor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToolbarService]
})
export class AppComponent {
  title = 'app';

  @ViewChild('document_default')
  public container: DocumentEditorContainer;

  public culture: string = 'en-US';

  ngOnInit() { }


  onClickSubmit(data: any) {
    if(!data.fileName || !validURL(data.fileName)) {
      alert('Invalid URL');
      return;
    }

    this.downloadFile(data.fileName);
  }

  downloadFile(fileUrl) {
    const component = this;
    fetch(fileUrl).then(response => response.text()).then(contents => {
      component.container.documentEditor.open(contents);
    });
  }
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
            return pattern.test(str);
}