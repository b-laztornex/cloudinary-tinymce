import { Editor, TinyMCE } from 'tinymce';
import { axios } from 'axios';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  function modifyText(){
    console.log('traim')
    editor.insertContent('<img src="https://via.placeholder.com/240" />');
  }
  const openDialog = function () {
    
    return editor.windowManager.open({
      title: 'Example plugin',
      body: {
        type: 'panel',
        items: [
          {
            type: 'grid', // component type
            columns: 4, // number of columns
            items: [ 
              {
                type: 'htmlpanel', // component type
                html: '<div id="tinymce-img-1"><img src="https://via.placeholder.com/60" /><div/>'
              },
              {
                type: 'htmlpanel', // component type
                html: '<input type="image" src="https://via.placeholder.com/60" />'
              },
              {
                type: 'htmlpanel', // component type
                html: '<input type="image" src="https://via.placeholder.com/60" />'
              },
              {
                type: 'htmlpanel', // component type
                html: '<input type="image" src="https://via.placeholder.com/60" />'
              },
             ] // array of panel components
          }
        ]
      },
      buttons: [
        {
          type: 'cancel',
          text: 'Close'
        },
        {
          type: 'submit',
          text: 'Save',
          primary: true
        }
      ],
      onAction:  function (api) {
        console.log(api);
      },
      onSubmit: function (api) {
        var data = api.getData();
        /* Insert content when the window form is submitted */
        editor.insertContent('Title: ' + data.title);
        api.close();
      }
    });
  };

  editor.ui.registry.addButton('tiny-cloudinary-mce', {
    text: 'tmc button',
    onAction: () => {
      console.log('pppp')
      openDialog();
      const el = document.getElementById("tinymce-img-1");
      el.addEventListener("click", modifyText, false);
      //editor.setContent('<p>content added from tiny-cloudinary-mce</p>');
      /*axios.get('/user?ID=12345')
      .then(function (response) {
        // handle success
        console.log(response);
        openDialog();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    */
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('tiny-cloudinary-mce', setup);
};
