//src/components/MusicPlayer.js
import React, { useState, useEffect } from 'react';
import './MusicPlayer.css'; // Import file CSS

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
        <div className="music-player-container">
            <h1>Music Player</h1>
            <ul className="song-list">
                {songs.map((song) => (
                    <li key={song._id} className="song-item">
                        <img src={song.imageUrl} alt={song.title} className="song-image" />
                        <div className="song-info">
                            <h2>{song.title}</h2>
                            <p>Artist: {song.artist}</p>
                        </div>
                        <audio controls className="audio-player">
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