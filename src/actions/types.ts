// user

export enum USER_ACTIONS_TYPES {
    SIGN_IN = "SIGN_IN",
    SIGN_OUT = "SIGN_OUT",
}

export type UserSignInType = {
    email?:string,
    password?:string
  }

export type UserFormType = {
   username?:string,
} & UserSignInType

export type UserDataType = {
    userId:string, username: string,
  exp:number, iat:number
  }

// message
export enum MESSAGE_ACTIONS_TYPES {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    CLEAR = "CLEAR"
}

export type Message = {
    message?:string
}


// course

export enum COURSE_ACTIONS_TYPES {
    SUBSCRIBE_COURSE = 'SUBSCRIBE_COURSE',
    UNSUBSCRIBE_COURSE="UNSUBSCRIBE_COURSE",
    CREATE_COURSE ="CREATE_COURSE",
    EDIT_COURSE="EDIT_COURSE",
    FETCH_COURSE = "FETCH_COURSE",
    FETCH_COURSES ="FETCH_COURSES"
}

export type CourseType = {
    _id?:string,
    price:number, 
    title:string,
    category:string,
    instructor:Instructor,
    description?:string,
    
}

export type Instructor = {
    username:string
}

export enum CoureOwner {
    instructor,
    student,
    default
  }
export type FetchCouresParamsTypes = {
    filterType:CoureOwner,
    userId:string,
    keyWord:string
  }

export enum CourseSortType  {
    Title="Title",
    Category="Category",
    Price="Price",
    Instructor="Instructor",
    reverse="reverse"
}


// review

export enum REVIEW_ACTIONS_TYPES {
    // currentyl not used 
    CREATE_REVIEW = "CREATE_REVIEW",
    EDIT_REVIEW = "EDIT_REVIEW" ,
    FETCH_REVIEW = "FETCH_REVIEW"
}

export type ReviewFormType = {
    content?: string,
    rating?:number
}

//student

export enum STUDENT_ACTIONS_TYPES {
    CHECK_NEWSTUDENT = "CHECK_NEWSTUDENT"
}

export type SpecialOfferType = {
    firstVisited?: number
    remainTime?: Date
}

// short cart

export enum SHOPCART_ACTIONS_TYPES {
    FETCH_SHOPCART = "FETCH_SHOPCART",
    ADD_SHOPCART = "ADD_SHOPCART",
    DELETE_SHOPCART = "DELETE_SHOPCART"
}

export type ShopCartType = {
    _id?:string,
    price:number, 
    title:string,
    category:string
}


// reduecer store states

export type ReducerStates = {
    // update when all states are refactored
    auth?: any,
    form?: any,
    alert?: any,
    courses?: any,
    newStudent?: any,
    shopCart?: any,
  };

