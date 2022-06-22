import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import FETCH_NEARBY from "Queries/fetchNearbyEpisodes";
import REQUEST_STREAM from 'Mutations/requestStream';
import getVideoSource from 'Components/Media/MediaItem/Video/getVideoSource';
import { isIOS } from 'react-device-detect';
import { getBaseUrl } from 'Helpers';

const useCreatePlaylist = (uuid, type, nextLimit = 10) => {
    const [playlist, setPlaylist] = useState([]);
    const [playlistLoading, setPlaylistLoading] = useState(true);
    const [mutationCalled, setMutationCalled] = useState(0);    
    const { loading: nearbyLoading, data: nearbyData } = useQuery(FETCH_NEARBY, {
        variables: {
            uuid,
            nextLimit
        },
        skip: type === "Movie"
    });

    const addEpisodeToPlaylist = (e) => {
        setPlaylist((oldPlaylist) => {
            const { name, uuid: episodeUUID, season, episodeNumber } = e;
            const { series } = e.season;

            const newPlaylistItem = {
                name,
                description: `${series.name} - ${season.name}, Episode ${episodeNumber}`,
                uuid: episodeUUID,
                html: `<h4>${name}</h4><span>${series.name} - ${season.name}, Episode ${episodeNumber}</span>`,
                season: season.name,
                series: series.name,
                episodeNumber
            }
            return [...oldPlaylist, newPlaylistItem];
        });
    };
    
    const [requestStream] = useMutation(REQUEST_STREAM, {
        onCompleted(data){
            setMutationCalled((i) => {
                return i + 1;
            });

            fetch(getBaseUrl() + data.createStreamingTicket.metadataPath)
                .then((response) => response.json())
                .then((response) => getVideoSource(isIOS, data, response))
                .then((response) => {
                    setPlaylist((oldPlaylist) => {
                        const newPlaylist = oldPlaylist;
                        const sources = {
                            type: response.mimeType,
                            src: response.source
                        };
                        newPlaylist[mutationCalled].sources = [sources];
        
                        return newPlaylist;
                    })
                })
                .catch((err) => err);
        }
    });
    
    useEffect(() => {
        if(type === "Episode"){
            setPlaylistLoading(true);
    
            if(!nearbyLoading){
                nearbyData.nearbyEpisodes.next.forEach((e) => {
                    addEpisodeToPlaylist(e);
    
                    requestStream({
                        variables: {
                            uuid: e.files[0].uuid
                        }
                    });
    
                });
                setPlaylistLoading(false);
            }
        }
    }, [nearbyData]);
    
    return [playlistLoading, playlist];
}

export default useCreatePlaylist;