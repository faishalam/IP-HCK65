import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    articles: [],
    myarticles : [],
    myarticlesById : []
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
        }
    }
})


export const { setArticles, setMyarticles, setMyarticlesById } = articleSlice.actions
export default articleSlice.reducer