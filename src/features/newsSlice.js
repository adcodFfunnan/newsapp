import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import * as api from '../api/news'



export const fetchTopHeadlines = createAsyncThunk('news/fetchTopHeadlines', async () => {
    const data = await api.getTopHeadlines()
    return data.articles
})

export const fetchSearchResults = createAsyncThunk('news/fetchSearchResults', async ({ query, sortBy }) => {
    const data = await api.getSearchResults(query, sortBy)
    return { data: data.articles, query: query, sortedBy: sortBy }
})

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        topHeadlines: {
            newsArticles: [],
            status: 'idle',
            error: null
        },
        searchResults: {
            newsArticles: [],
            status: 'idle',
            queryForResults: "",
            sortedBy: "relevancy",
            error: null
        }
    },
    extraReducers: {
        [fetchTopHeadlines.pending]: state => {
            state.topHeadlines.status = 'pending'
        },
        [fetchTopHeadlines.fulfilled]: (state, action) => {
            state.topHeadlines.status = 'succeeded'
            state.topHeadlines.newsArticles = action.payload
        },
        [fetchTopHeadlines.rejected]: (state, action) => {
            state.topHeadlines.status = 'failed'
            state.topHeadlines.error = action.error
        },

        [fetchSearchResults.pending]: state => {
            state.searchResults.status = 'pending'
        },
        [fetchSearchResults.fulfilled]: (state, action) => {
            state.searchResults.status = 'succeeded'
            state.searchResults.newsArticles = action.payload.data
            state.searchResults.queryForResults = action.payload.query
            state.searchResults.sortedBy = action.payload.sortedBy
        },
        [fetchSearchResults.rejected]: (state, action) => {
            state.searchResults.status = 'failed'
            state.searchResults.error = action.error
        }
    }
})



export const { increment } = newsSlice.actions



export default newsSlice.reducer