import React from 'react'

const Test = () => {
    const tests = (e) => {
        e.preventDefault()
        console.log(e.target.file.files[0])
    }
    return (
        <div>
            <form onSubmit={tests}>
                <input type="file" name='file' />
                <button>sssssss</button>
            </form>
        </div>
    )
}

export default Test
