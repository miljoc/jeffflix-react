import getUrlParameter from './getUrlParameter';
import { getBaseUrl, getFQDNUrl } from './getBaseUrl';
import updateSuggestions from './updateSuggestions';
import canPlayCodec from './canPlayCodec';
import generateMediaUrl from './generateMediaUrl';
import generateFileList from './generateFileList';
import isInitialSetup from './isInitialSetup';
import { convertToMinutes, convertToMinutesSeconds, convertToHMS, convertMinutesToMilliseconds } from './convertTime';
import streamFilter from './streamFilter';
import copyToClipboard from './copyToClipboard';
import compileEpisodes from './compileEpisodes';
import splitFilepath from './splitFilepath';
import convertBitrate from './convertBitrate';
import convertFilesize from './convertFilesize';
import propertiesMap from './propertiesMap';
import pluralize from './pluralize';
import { getLocalStorage, setLocalStorage } from './localStorage';
import { generateIMDbUrl , generateTMDbUrl } from './generateExternalUrls';

export {
    getUrlParameter,
    getBaseUrl,
    getFQDNUrl,
    canPlayCodec,
    generateMediaUrl,
    updateSuggestions,
    isInitialSetup,
    generateFileList,
    convertToMinutes,
    convertMinutesToMilliseconds,
    convertToMinutesSeconds,
    convertToHMS,
    streamFilter,
    copyToClipboard,
    compileEpisodes,
    splitFilepath,
    convertBitrate,
    convertFilesize,
    propertiesMap,
    getLocalStorage,
    setLocalStorage,
    pluralize,
    generateIMDbUrl,
    generateTMDbUrl
};
