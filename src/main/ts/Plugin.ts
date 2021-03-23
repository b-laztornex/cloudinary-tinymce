import { Editor, TinyMCE } from 'tinymce';
import axios from 'axios';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  const element_images = []
  const element_ids = []

  function insert_cloudinary_image(){
    editor.insertContent(`<img src="${this.childNodes[0].style.backgroundImage.slice(4, -1).replace(/"/g, "")}" />`);
  }
  const openDialog = function ( element_images) {
    return editor.windowManager.open({
      title: 'Example plugin',
      body: {
        type: 'panel',
        items: [
          {
            type: 'grid', // component type
            columns: 4, // number of columns
            items: element_images,
          }
        ]
      },
      buttons: [
        {
          type: 'cancel',
          text: 'Close'
        },
      ],
      onAction:  function (api) {
      },
      onSubmit: function (api) {
        api.close();
      }
    });
  };

  editor.ui.registry.addButton('tiny-cloudinary-mce', {
    text: 'Cloudinary',
    onAction: () => {
      var config = {
        headers: {'Access-Control-Allow-Origin': '*'}
      };
      axios.get(`${window.location.host}/api/v1/cloudinary_images`, config)
      .then(function (response) {
        console.log(response);
        response.data.resources.forEach( function(el){
          let item = {
            type: 'htmlpanel', // component type
            html: `<div id="${el.asset_id}"><div style="background-image: url('${el.url}');width:120px;height:120px;background-size:cover;"></div></div>`
          };
          element_images.push(item);
          element_ids.push( {id: el.asset_id, url: el.url} );
        })
        return {el_images: element_images, el_ids: element_ids}
      })
      .then(function (response) {
        openDialog(response.el_images);
        return response.el_ids
      })
      .then(function (response) {
        response.forEach( function(el){
          console.log(el);
          let el_img = document.getElementById(el.id);
          el_img.addEventListener("click", insert_cloudinary_image, false);
        })
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('tiny-cloudinary-mce', setup);
};
