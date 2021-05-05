//import firebase from 'firebase/app';
import { db } from "../firebase"
import { useState, useEffect } from "react";
//import { indexOf } from "core-js/core/array";

function SongList() {
const [songs, setSongs]= useState([])
const fetchSongs = async() => {
    const snapshot = await db.collection('songs').get()
    setSongs(snapshot.docs.map(doc => doc.data()));
}

useEffect(() => {
    fetchSongs();
})

function machineChoices(song) {
    if (song.Joysound && song.Dam) {
        return (
            <p>Joysound and DAM</p>
        )
    } else if (song.Joysound && !song.Dam) {
        return (
            <p>on Joysound </p>
        )
    } else if (!song.Joysound && song.Dam) {
        return (
            <p>on DAM</p>
        )
    }
}

return (
    <div>
        {
            songs.map((song, index)=> {
                return (
                    <div>
                        <span className="mb-12" key={index}>"{song.Title}" by {song.Artist} {machineChoices(song)}</span>   
                    </div>
                )
            })
        }
    </div>
);
}

export default SongList;