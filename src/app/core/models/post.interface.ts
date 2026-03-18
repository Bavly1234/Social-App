export interface Post {
    _id: string
    image: string
    privacy: string
    user: User
    sharedPost: any
    likes: any[]
    createdAt: string
    body: string
    commentsCount: number
    topComment: any
    sharesCount: number
    likesCount: number
    isShare: boolean
    id: string
    bookmarked: boolean
    isEditing?: boolean;
    editContent?: string;
    isSaved?: boolean;
    isLiked?: boolean;
isLikeLoading?: boolean;


}

export interface User {
    _id: string
    name: string
    username: string
    photo: string
}
