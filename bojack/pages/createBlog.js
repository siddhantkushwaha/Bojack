import Head from "next/head";
import {Editor} from '@tinymce/tinymce-react';
import {useRef} from "react";
import {TinyCloudApiKey} from "../config.json"

export default function CreateBlog() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <div className="">
            <Head>
                <title>Create Blog</title>
            </Head>
            <div className="p-5 text-center">
                <button type="button" className="btn btn-danger">Cancel</button>
                <button type="button" className="btn btn-success">Publish</button>
            </div>
            <Editor
                apiKey={TinyCloudApiKey}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<h1>What's this blog about?</h1>"
                init={{
                    height: 1000,
                    menubar: false,
                    statusbar: false,
                    skin: 'oxide',
                    content_css: 'light',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    editor_style: '',
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                }}
            />
        </div>
    )
}
