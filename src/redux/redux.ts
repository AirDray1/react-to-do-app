type State = {
    пиво: number;
    чипсы: number;
    сиги: number;
};

type Action = {
    type: 'КУПИТЬ';
    ШО: keyof State;
    СКОКА: number;
};

function reducer(state: State | undefined, action: Action): State {
    if (!state) {
        return {
            пиво: 100,
            чипсы: 100,
            сиги: 100
        };
    }
    
    if (action.type === 'КУПИТЬ') {
        return {
            ...state,
            [action.ШО]: state[action.ШО] - action.СКОКА
        };
    }
    
    return state;
}

type Listener = () => void;

type Store = {
    getState: () => State;
    dispatch: (action: Action) => void;
    subscribe: (cb: Listener) => () => void;
};

function createStore(reducer: (state: State | undefined, action: Action) => State): Store {
    let state = reducer(undefined, {} as Action);
    let cbs: Listener[] = [];
    
    const getState = () => state;
    
    const subscribe = (cb: Listener) => {
        cbs.push(cb);
        return () => {
            cbs = cbs.filter(c => c !== cb);
        };
    };
    
    const dispatch = (action: Action) => {
        const newState = reducer(state, action);
        if (newState !== state) {
            state = newState;
            for (const cb of cbs) cb();
        }
    };
    
    return {
        getState,
        dispatch,
        subscribe
    };
}


const store = createStore(reducer)

//запомнит функцию во внутреннем массиве cbs. 
//она будет запущена при любом успешном dispatch 
const unsubscribe = store.subscribe(() => console.log(store.getState())) 

setTimeout(unsubscribe, 10000) //отпишемся через 10 секунд, например

//происходит запуск редьюсера, который создает новый state. 
//dispatch запускает всех подписчиков из массива cbs
store.dispatch({type: 'КУПИТЬ', ШО: 'пиво', СКОКА: 3}) 