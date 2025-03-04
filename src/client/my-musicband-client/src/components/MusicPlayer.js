// src/components/MusicPlayer.js
import React, { useState, useEffect } from 'react';

function MusicPlayer() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('/api/songs'); // Gọi API endpoint mới
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    if (loading) {
        return <div>Loading songs...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Music Player</h1>
            <ul>
                {songs.map((song) => (
                    <li key={song._id}>
                        <h2>{song.title}</h2>
                        <p>Artist: {song.artist}</p>
                        <img src={song.imageUrl} alt={song.title} style={{ maxWidth: '200px' }} />
                        <audio controls>
                            <source src={song.audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MusicPlayer;