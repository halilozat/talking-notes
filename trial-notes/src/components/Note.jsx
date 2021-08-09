import React, { useEffect, useState } from 'react'
import NoteService from '../services/noteService'

export default function Note() {

    const [notes, setNotes] = useState({})

    useEffect(() => {
        let noteService = new NoteService();
        noteService
            .getNotes()
            .then((result) => setNotes(result.data));
    }, []);

    return (
        <div>
            <form className="ui fluid form">
                <div className="field">
                    <input type="text" placeholder="Add a note" />
                    <div className="ui divider"></div>
                    <button className="positive ui button">Add Note</button>
                </div>
                <div className="ui divider"></div>
                <div className="ui relaxed divided list">
                    {
                        notes.map((note) => (
                            <div className="item">
                                <div className="content">
                                    <a className="header">{note.desc}</a>
                                    <div className="description">{note.createdAt}</div>
                                </div>
                            </div>
                        ))
                    }

                    <div className="ui divider"></div>
                </div>
            </form>
        </div>
    )
}
