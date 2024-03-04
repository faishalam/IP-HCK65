import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    articles: [],
    myarticles: [],
    myarticlesById: [],
    currentPage: 1,
    hasMore: true
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload
        },
        setMyarticles: (state, action) => {
            state.myarticles = action.payload
        },
        setMyarticlesById: (state, action) => {
            state.myarticlesById = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
    }
})


export const { setArticles, setMyarticles, setMyarticlesById, setCurrentPage, setHasMore } = articleSlice.actions;

export default articleSlice.reducer