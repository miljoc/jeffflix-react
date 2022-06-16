// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import { convertToHMS, convertFilesize, convertBitrate , pluralize } from 'Helpers';
import { v4 as uuidv4 } from 'uuid';
import { hideModal } from 'Redux/Actions/modalActions';
import * as S from 'Components/Modal/Styles';
import ModalClose from '../ModalClose';

type Props = {
    type: string,
    files: Array<Object>,
};

const AdvancedInfoModal = ({ files, type }: Props) => {
    const dispatch = useDispatch();
    const videos = files.map(file => file.streams.filter(stream => stream.streamType === "video"))[0];
    const subtitles = files.map(file => file.streams.filter(stream => stream.streamType === "subtitle"))[0];
    const audio = files.map(file => file.streams.filter(stream => stream.streamType === "audio"))[0];

    return (
        <S.Modal>
            <S.ModalWrap>
                <S.ModalHeader>
                    <S.ModalHeading>
                        {type} Info
                        <ModalClose onClick={() => dispatch(hideModal())} />
                    </S.ModalHeading>
                </S.ModalHeader>
                <S.ModalBody>
                    {files && files.map((file) =>
                        (
                            <S.FileWrap key={file.filePath}>
                                <S.PathWrap>{file.filePath}</S.PathWrap>
                                <S.SectionWrap>
                                    <S.InfoTitle>File Info</S.InfoTitle>
                                    <S.InfoWrap>
                                        <div>
                                            <p><span>Duration:</span> {convertToHMS(file.totalDuration)}</p>
                                            <p><span>Size:</span> {convertFilesize(file.fileSize, 2, true)}</p>
                                        </div>
                                    </S.InfoWrap>
                                </S.SectionWrap>

                                {videos && (
                                    <S.SectionWrap>
                                        <S.InfoTitle>Video {pluralize(videos.length, 'Track', 's')}</S.InfoTitle>
                                        <S.InfoWrap>
                                            {videos.map(video => (
                                                <div key={uuidv4()}>
                                                    <p><span>Dimensions:</span> {video.resolution}</p>
                                                    <p><span>Bitrate:</span> {convertBitrate(video.bitRate)}</p>
                                                    <p><span>Codec:</span> {video.codecName}</p>
                                                    <p><span>Codec Mime:</span> {video.codecMime}</p>
                                                    <p><span>Profile:</span> {video.profile}</p>
                                                </div>
                                            ))}
                                        </S.InfoWrap>
                                    </S.SectionWrap>
                                )}

                                {audio && (
                                    <S.SectionWrap>
                                        <S.InfoTitle>Audio {pluralize(audio.length, 'Track', 's')}</S.InfoTitle>
                                        <S.InfoWrap>
                                            {audio.map((track, index) => (
                                                <div key={uuidv4()}>
                                                    {(audio.length > 1) && <p>Track {index + 1}</p>}
                                                    <p>
                                                        <span>Codec:</span> {track.codecName} {track.codecMime}
                                                    </p>
                                                    <p>
                                                        <span>Bitrate:</span> {convertBitrate(track.bitRate)}
                                                    </p>
                                                    <p>
                                                        <span>Language:</span>
                                                        {track.title ? track.title : track.language}
                                                    </p>
                                                </div>
                                            ))}
                                        </S.InfoWrap>
                                    </S.SectionWrap>
                                )}

                                {subtitles.length > 0 && (
                                    <S.SectionWrap noMargin>
                                        <S.InfoTitle>Subtitles</S.InfoTitle>
                                        <S.InfoWrap>
                                            {subtitles.map(subtitle => (
                                                <p key={uuidv4()}>
                                                    {subtitle.title ? subtitle.title : subtitle.language}
                                                </p>
                                            ))}
                                        </S.InfoWrap>
                                    </S.SectionWrap>
                                )}
                            </S.FileWrap>
                        )
                    )}
                </S.ModalBody>
            </S.ModalWrap>
        </S.Modal>
    );
};

export default AdvancedInfoModal;
