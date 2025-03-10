import lists from '../ToDo.json'

export type Task = {
    id: string;
    categoryId: string;
    tagsId: string[];
    todo: string;
    date: string;
    status: boolean;
    userId: number;
};

export type Category = {
    id: string;
    userId: number;
    name: string;
    color: string;
};

export type Tag = {
    id: string;
    userId: number;
    name: string;
    color: string;
};

type State = {
    todos: Task[];
    categories: Category[];
    tags: Tag[];
    selectedPage: string;
};

type Listener = () => void;

type Store = {
    getState: () => State;
    dispatch: (action: Action) => void;
    subscribe: (listener: Listener) => () => void;
};

type Action =
    | { type: 'ADD_TODO'; payload: Task }
    | { type: 'REMOVE_TODO'; payload: string } // ID of the todo to remove
    | { type: 'TOGGLE_TODO_STATUS'; payload: string } // ID of the todo to toggle
    | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Task> } } 
    | { type: 'ADD_CATEGORY'; payload: Category }
    | { type: 'REMOVE_CATEGORY'; payload: string } // ID of the category to remove
    | { type: 'ADD_TAG'; payload: Tag }
    | { type: 'REMOVE_TAG'; payload: string } // ID of the tag to remove
    | { type: 'SET_SELECTED_PAGE'; payload: string }

function reducer(state: State = {...lists, selectedPage: "Home"}, action: Action): State {
    switch (action.type) { 
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };

        case 'REMOVE_TODO':
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };

        case 'TOGGLE_TODO_STATUS':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, status: !todo.status } : todo
                )
            };

        case 'UPDATE_TODO':  // Handle the update action
        return {
            ...state,
            todos: state.todos.map(todo =>
                todo.id === action.payload.id ? { ...todo, ...action.payload.updates } : todo
            ),
        };

        case 'ADD_CATEGORY':
            return { ...state, categories: [...state.categories, action.payload] };

        case 'REMOVE_CATEGORY':
            return { ...state, categories: state.categories.filter(cat => cat.id !== action.payload) };

        case 'ADD_TAG':
            return { ...state, tags: [...state.tags, action.payload] };

        case 'REMOVE_TAG':
            return { ...state, tags: state.tags.filter(tag => tag.id !== action.payload) };

        case 'SET_SELECTED_PAGE':
            return { ...state, selectedPage: action.payload };

        default:
            return state;
    }
}

function createStore(reducer: (state: State | undefined, action: Action) => State): Store {
    let state = reducer(undefined, {} as Action);
    let listeners: Listener[] = [];
    
    const getState = () => state;
    
    const subscribe = (listener: Listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };
    
    const dispatch = (action: Action) => {
        const newState = reducer(state, action);
        if (newState !== state) {
            state = newState;
            listeners.forEach(listener => listener());
        }
    };
    
    return {
        getState,
        dispatch,
        subscribe
    };
}

export function isToday(timestamp: string) {
    const givenDate: Date = new Date(timestamp);
    const today: Date = new Date();

    return (
        givenDate.getUTCFullYear() === today.getUTCFullYear() &&
        givenDate.getUTCMonth() === today.getUTCMonth() &&
        givenDate.getUTCDate() === today.getUTCDate()
    );
}

export function isThisWeek(timestamp: string) { 
    const givenDate: Date = new Date(timestamp);
    const today: Date = new Date();
    
    const todayDayOfWeek = today.getDay(); 

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - todayDayOfWeek));

    return givenDate >= today && givenDate <= endOfWeek;
}

export function formatDate(date: string) {
    let newDate = new Date(date);
    let dd = String(newDate.getDate()).padStart(2, "0"); // Get day with leading zero
    let mm = String(newDate.getMonth() + 1).padStart(2, "0"); // Get month (add 1 since months start from 0)
    let yyyy = String(newDate.getFullYear()).slice(-2); // Get full year
  
    return `${dd}-${mm}-${yyyy}`; // Format as DD-MM-YYYY
  }

export const store = createStore(reducer);
export type RootState = ReturnType<typeof store.getState>;