import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IStories, IStory } from "../../types";
import { addStory, deleteStory, dislikeStory, getMyStory, getStories, likeStory, viewStory } from "../../services/storyService";

interface Interest {
    story: IStories[] | [];
    myStory: IStory[];
    isLoading: boolean;
    isError: boolean;
    status: number | null;
    errorMessage: string;
    isSuccess: boolean;
}

const initialState: Interest = {
    story: [],
    myStory: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccess: false,
    status: null
};

export const storySlice = createSlice({
    name: "story",
    initialState,
    reducers: {
        resetStory: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.status = null,
                state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addStory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addStory.fulfilled, (state, action: PayloadAction<{ story: IStory; message: string }>) => {
                state.isLoading = false;
                state.isSuccess = true;

                state.myStory?.push(action.payload.story)
            })
            .addCase(addStory.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })
            //get my stories
            .addCase(getMyStory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyStory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.myStory = action.payload.story
            })
            .addCase(getMyStory.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })

            //get all stories
            .addCase(getStories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStories.fulfilled, (state, action: PayloadAction<{ story: IStories[]; message: string }>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.story = action.payload.story
            })
            .addCase(getStories.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })


            //like stories
            .addCase(likeStory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(likeStory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const story = state.story.map((stories) => {
                    stories.stories = stories.stories.map((item) => {
                        if (item._id === action.payload.story._id) {
                            return action.payload.story;

                        } else {
                            return item;
                        }
                    })
                    return stories;
                })
                state.story = story;
            })
            .addCase(likeStory.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })

            //view stories
            .addCase(viewStory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(viewStory.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(viewStory.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })

            //dislike stories
            .addCase(dislikeStory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(dislikeStory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const story = state.story.map((stories) => {
                    stories.stories = stories.stories.map((item) => {
                        if (item._id === action.payload.story._id) {
                            return action.payload.story;

                        } else {
                            return item;
                        }
                    })
                    return stories;
                })
                state.story = story;
            })
            .addCase(dislikeStory.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })


            //delete stories
            .addCase(deleteStory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteStory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const myStory = state.myStory.filter((item)=>item._id !== action.payload.story_id)
                state.myStory = myStory;
            })
            .addCase(deleteStory.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                const error = action.payload as {
                    message: string,
                    status: number
                };
                state.errorMessage = error.message;
                state.status = error.status;
            })
    }

})


export const { resetStory } = storySlice.actions;

export default storySlice.reducer;
