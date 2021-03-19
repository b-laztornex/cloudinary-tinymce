import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('tiny-cloudinary-mce', {
    text: 'tiny-cloudinary-mce button',
    onAction: () => {
      editor.setContent('<p>content added from tiny-cloudinary-mce</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('tiny-cloudinary-mce', setup);
};
