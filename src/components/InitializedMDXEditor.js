'use client'
// InitializedMDXEditor.tsx
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    frontmatterPlugin,
    MDXEditor, codeBlockPlugin, sandpackPlugin, codeMirrorPlugin
} from '@mdxeditor/editor'
// Only import this to the next file
export default function InitializedMDXEditor({
             editorRef,
             ...props
         }) {
    return (
        <MDXEditor
            plugins={[
                codeBlockPlugin({defaultCodeBlockLanguage: 'jsx'}),
                codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript',jsx:'jsx', css: 'CSS' } }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                frontmatterPlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            {' '}
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                        </>
                    )
                })
            ]}
            contentEditableClassName="prose"
            {...props}
            ref={editorRef}
        />
    )
}