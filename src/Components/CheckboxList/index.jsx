import React, { useRef } from 'react'
import { MatchLine } from 'Containers/Admin/Tools/Styles';
import EpisodeMatch from 'Components/MediaMatch/EpisodeMatch';
import PropTypes from 'prop-types';

const CheckboxList = ({ files, episodesChecked, setEpisodesChecked, refsById }) => {
    const previousChecked = useRef();

    // 'current' is part of useRef, confusing. map it to "previous"
    const setEpisodesCheckedWithShift = ({ current: previous }, currentIndex) => {
        setEpisodesChecked(oldEpisodes => {
            let newArray = [];
            const prev = parseInt(previous, 10);
            const curr = parseInt(currentIndex, 10)

            const toCheck = curr < prev
                ? refsById.slice(curr, prev + 1)
                : refsById.slice(prev, curr + 1);

            toCheck.forEach(c => {
                // eslint-disable-next-line no-param-reassign
                refsById[c.index].ref.current.checked = true
                const fileObj = {
                    filePath: c.ref.current.dataset.filepath,
                    fileName: c.ref.current.dataset.filename,
                    uuid: c.uuid,
                    index: c.index,
                    checked: c.ref.current.checked
                };                    
                newArray = [...newArray, fileObj];
            });

            const finalArray = [...oldEpisodes, ...newArray];

            // make sure episodes are always unique
            return finalArray.filter((e, i) => finalArray.findIndex(a => a.uuid === e.uuid) === i);
        });
    }

    const handleCheckboxChange = (event) => {
        const { nativeEvent, target: { id, checked, dataset: { filepath, filename, index } } } = event;

        // check if shift key is selected
        if(nativeEvent.shiftKey){
            setEpisodesCheckedWithShift(previousChecked, index);
        }else if(checked){
            previousChecked.current = index;
        }

        // always add the latest checked
        setEpisodesChecked(oldEpisodes => {
            const fileObj = {
                filePath: filepath,
                fileName: filename,
                uuid: id,
                index,
                checked
            };
            const newArray = [ ...oldEpisodes, fileObj ];

            // make sure episodes are always unique
            return newArray.filter((e, i) => newArray.findIndex(a => a.uuid === e.uuid) === i);
        });   
        
        // remove single unchecked
        if(!checked){
            setEpisodesChecked(oldEpisodes => {
                return oldEpisodes.filter(e => e.uuid !== id)
            });
        }        

    };

    return (
        <div>
            {files.map((episode, index) => (
                <MatchLine key={episode.uuid}>
                    <EpisodeMatch
                        episode={episode}
                        index={index}
                        checked={episodesChecked.filter(e => e.uuid === episode.uuid).length > 0}
                        forwardedRef={refsById[index].ref}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                </MatchLine>    
            ))}
        </div>
    );
};

CheckboxList.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
            filePath: PropTypes.string,            
            uuid: PropTypes.string,
        })
    ).isRequired,
    episodesChecked: PropTypes.arrayOf(
        PropTypes.shape({
            filePath: PropTypes.string,
            fileName: PropTypes.string,
            uuid: PropTypes.string,
            index: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            checked: PropTypes.bool
        })
    ).isRequired,
    setEpisodesChecked: PropTypes.func.isRequired,
    refsById: PropTypes.arrayOf(
        PropTypes.shape({
            ref: PropTypes.oneOfType([
                PropTypes.func, 
                PropTypes.shape({ current: PropTypes.instanceOf(Element) })
            ])
        })
    ).isRequired
};

export default CheckboxList;