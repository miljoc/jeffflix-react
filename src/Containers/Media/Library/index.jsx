import React from 'react'
import PropTypes from 'prop-types'
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from 'react-virtualized-auto-sizer';
import { CardPoster, CardWrap, PosterWrap } from 'Components/Media/Card/Styles';
import debounce from 'lodash/debounce';
import MediaCard from 'Components/Media/Card';
import { placeholder } from 'Components/Media/Card/Placeholder';
import { LibraryListItem } from '../Styles';
import MediaName from '../../../Components/Media/Card/MediaName';

export const itemsPerPage = 50;
export const columnWidth = 190;
export const rowHeight = 340;

export const scrollToIndex = (listRef, index, columnCount, align = "center") => {
    const row = Math.floor(index / columnCount);
    listRef.current?.scrollToItem({ rowIndex: row, align })
};

const Library = ({ 
    count,
    loadMoreItems,
    data,
    debounceAmount,
    listRef,
    // setColumnCount
}) => {
    const isItemLoaded = index => !!data[index];

    return (
        <AutoSizer>
            {({ height, width }) => {

                return (
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={count}
                        loadMoreItems={debounce(loadMoreItems, debounceAmount, {
                            leading: false,
                            trailing: true
                        })}
                        minimumBatchSize={itemsPerPage}
                    >
                        {({ onItemsRendered, ref }) => {
                            const newItemsRendered = (gridData) => {
                                const useOverscanForLoading = true;
                                const {
                                    visibleRowStartIndex,
                                    visibleRowStopIndex,
                                    visibleColumnStopIndex,
                                    overscanRowStartIndex,
                                    overscanRowStopIndex,
                                    overscanColumnStopIndex
                                } = gridData;
                    
                                const endCol =
                                      (useOverscanForLoading
                                          ? overscanColumnStopIndex
                                          : visibleColumnStopIndex) + 1;
                    
                                const startRow =
                                      useOverscanForLoading 
                                          ? overscanRowStartIndex
                                          : visibleRowStartIndex;

                                const endRow =
                                      useOverscanForLoading
                                          ? overscanRowStopIndex
                                          : visibleRowStopIndex;
                    
                                const visibleStartIndex = startRow * endCol;
                                const visibleStopIndex = endRow * endCol;

                                onItemsRendered({
                                    // call onItemsRendered from InfiniteLoader so it can load more if needed
                                    visibleStartIndex,
                                    visibleStopIndex
                                });                                                                        
                            };

                            const columnCount = Math.floor(width / columnWidth);
                            const rowCount = Math.ceil(count / columnCount);
  
                            return (
                                <FixedSizeGrid
                                    width={width}
                                    height={height}
                                    columnWidth={columnWidth}
                                    columnCount={columnCount}
                                    className="List"
                                    itemData={{ list: data, columnCount }}
                                    itemCount={count}
                                    rowHeight={rowHeight}
                                    rowCount={rowCount}
                                    onItemsRendered={newItemsRendered}
                                    ref={list => {
                                        ref(list); // Give InfiniteLoader a reference to the list
                                        // eslint-disable-next-line no-param-reassign
                                        listRef.current = list; // Set your own ref to it as well.
                                        // setColumnCount(columnCount);
                                    }}
                                >
                                    {({columnIndex, rowIndex, data: movieData, style}) => {
                                        const { list, columnCount: columns } = movieData;
                                        const index = rowIndex * columns + columnIndex;
                                        const item = list[index];

                                        if(index < count){
                                            return (item === undefined || item === null)
                                                ? (
                                                    <div style={style} key={index} data-index={index}>
                                                        <LibraryListItem>
                                                            <CardWrap>
                                                                <PosterWrap title="Loading">
                                                                    <CardPoster immediate bgimg={placeholder} />
                                                                </PosterWrap>
                                                                <MediaName name="Loading..." />
                                                            </CardWrap>
                                                        </LibraryListItem>
                                                    </div>
                                                )
                                                : (
                                                    <div style={style} key={item.uuid} data-index={index}>
                                                        <LibraryListItem>
                                                            {item.type === "Movie" ? (
                                                                <MediaCard
                                                                    name={item.name}
                                                                    title={item.title}
                                                                    posterPath={item.posterPath}
                                                                    type={item.type}
                                                                    files={item.files}
                                                                    playState={item.playState}
                                                                    uuid={item.uuid}
                                                                    year={item.year}
                                                                />
                                                            ) : (
                                                                <MediaCard
                                                                    name={item.name}
                                                                    posterPath={item.posterPath}
                                                                    type={item.type}
                                                                    unwatchedEpisodesCount={item.unwatchedEpisodesCount}
                                                                    uuid={item.uuid}
                                                                    year={item.firstAirDate.split("-")[0]}
                                                                />
                                                            )}
                                                        </LibraryListItem>
                                                    </div>
                                                );
                                        }
                                            
                                        return false;
                                            
                                    }}
                                </FixedSizeGrid>
                            );
                        }}
                    </InfiniteLoader>          
                )}}
        </AutoSizer>
    )
}

Library.propTypes = {
    count: PropTypes.number.isRequired,
    loadMoreItems: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    debounceAmount: PropTypes.number.isRequired,
    listRef: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired,
    // setColumnCount: PropTypes.func.isRequired
}

export default Library