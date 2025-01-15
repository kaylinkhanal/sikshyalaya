import React from 'react'
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Image } from 'lucide-react'

const ToolbarButton = ({ onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <Icon className="w-5 h-5" />
  </button>
)

const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    (<div className="flex flex-wrap gap-1 p-2 bg-gray-100 border-b border-gray-300">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} icon={Bold} />
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} icon={Italic} />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        icon={Underline} />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        icon={Strikethrough} />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        icon={AlignLeft} />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        icon={AlignCenter} />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        icon={AlignRight} />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        icon={AlignJustify} />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        icon={List} />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        icon={ListOrdered} />
      <ToolbarButton onClick={addImage} icon={Image} />
    </div>)
  );
}

export default EditorToolbar

