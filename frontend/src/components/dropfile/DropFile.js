import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect } from 'react';

function DropFile({ files, setFiles }) {

    const onDrop = useCallback(acceptedFiles => {
        console.log("FileDrop : ", acceptedFiles);
        setFiles(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file),
        })));
    }, [setFiles]);

    useEffect(
        () => () => {
            //avoids memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    const showFile = files.map((file) => (
        <>
            {file.name}
            <br></br>
            Type : {file.type}
        </>

    ));

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <br />
            <h3>Uploaded Files</h3>
            <h5>{showFile}</h5>
        </>
    )
}

export default DropFile;