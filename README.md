# React boilerplate and example
## Using flux architecture and ES6

# Let's do it
Run

    npm install


# Tools and libraries
We are gonna use [Flux](https://facebook.github.io/flux) architecture for this project.

Also we are gonna use that grunt tools:

 - [Babelify](https://github.com/babel/babelify)
 - [Browserify](http://browserify.org/)
 - [LiveReactLoad](https://github.com/milankinen/livereactload)
 - [ESLINT](http://eslint.org/)

The structure of the project is composed following the three basic elements of FLUX architecture:

- Actions
- Stores
- Dispatcher (Constants, Dispatcher)
- Controller views - Components

# Data structure - first of all
We are gonna split the information in two arrays of data:

 - List : Array of data that contains the static information (name). The order of that array never changes.
 - LeaderBoard: dynamic array that contains the same information as list + ID and SCORE.

## Let's talk about how our application works:

On each button click you will fire a onClick event that calls a action, that action send a signal to our store and calls the incrementScore function.
Our incrementScore function will find our player on the LeaderBoard array using our ID  increment the score by one and sort the leaderBoard list. After that we will trigger our changes to all subscribed components in that case one(GameItems).

## The problem:
If we only have one array for hold all players information on each array reorder we will render all of our components and the two components(clickableArea and leaderBoard) will be reordered.
We need to have our players list connected to store because we need to know when new user is added but also we need to dismiss all array reorder changes...

## The solution:
We will have two arrays, as you can see, to hold our information.
One with a static order and another with a dynamic order connected by a KEY sended on each click to find our player on LeaderBoard list.



---------------------------------------




#Actions

Our actions will be composed by:
 - Add player
  - Increment counter

# Stores

## First of all - constructor

We will define our data on a constructor. Because we are using ES6 we will extend from EventEmitter.


    constructor(){
    super();
    
    this.players = {
                list: [
                    {name: 'Carles'},
                    {name: 'Xavi'},
                    {name: 'Tomás'},
                    {name: 'Adri'}
                ],
                leaderBoard: [
                    {name: 'Carles', id: 0, score: 0},
                    {name: 'Xavi', id: 1, score: 0},
                    {name: 'Tomás', id: 2, score: 0},
                    {name: 'Adri', id: 3, score: 0}
                ]
     };
     
We define our players as a property of our object on the constructor, then we will have our main data setted on object call.

        Dispatcher.register((function (payload) {
            let action = payload.action;
            switch (action.type) {
                case Constants.ActionTypes.ADD_PLAYER:
                    let name = action.playerName;

                    this.addPlayer(name);
                    break;
                case Constants.ActionTypes.INCREMENT_SCORE:
                    let id = action.playerId;
                    this.incrementScore(id);
            }
        }).bind(this));
        
Then we will define our 'event index' with the switch.

## Methods explained:

Sort players will sort our leaderBoard list by SCORE

    sortPlayers: function sortPlayers() {
        this.players.leaderBoard.sort(function (previous, current) {
            let result = 0;
            if (previous.score < current.score) {
                result = 1;
            } else if (previous.score > current.score) {
                result = -1;
            }
            return result;
        });
    }
    
Add player will add a new player to our two lists, linking them by a ID. Then will emit a event to our listening components.

    addPlayer(data) {
            let id = this.players.list.push({name: data}) - 1;
            this.players.leaderBoard.push({name: data, score: 0, id: id});
            this.emit('change');
    }

IncrementScore function that recibes our player ID, finds it on our leaderBoard array and increments the score by one.
After that we call our sort players and we do a emit to all of our subscribed components in that example case only one.

    incrementScore(playerId) {
            this.players.leaderBoard.find(x => x.id === playerId).score++;
            this.sortPlayers();
            this.emit('change');
            console.log(this.players.leaderBoard);
    }
    
Add and remove change listener are used to attach callbacks to the main event of our store.

    addChangeListener(callback) {
            this.on('change', callback);
    }
    
    removeChangeListener(callback) {
            this.removeListener('change', callback);
    }
    
Also we have a simple getter:

    getPlayers() {
        return this.players;
    }
    
#Components

##ClickGame

ClickGame is a wrapper for all the components. Holds a title a header and a controller view:

### Header

Header is a component used to add new players to the game. That component has a input and a simple function to catch the input value, send it to the action and reset the input box

## GameItems - Controller View

Game items is who rules all the game subcomponents. Basically is who have a connection via EventEmmiter with the store.

Updates and append the data to their children components to be updated when something changes.

Let's see the code:

Get initial state is the react method to init our state data. Whe will call getPlayers store method.

    getInitialState: function () {
        return PlayersStore.getPlayers();
    },
    
Component did mount will execute AFTER the first render occurs and will set a listen on our change event.

    componentDidMount: function () {
        PlayersStore.addChangeListener(this.refreshList);
    },
    
On that component we will render also TWO more components passing to them two players lists:

    render(){
        return (
            <div className="col-md-10 secondary-box center">
                <ClickableArea players={this.state.list}/>
                <LeaderBoard players={this.state.leaderBoard}/>
            </div>
        )
    }
    
### ClickableArea

ClickableArea has a list of players with a related button. That button will increment the score leaderBoard counter by one.


    
Used to define the type of our components properties. Is important use that to improve the reusability of our component.

    propTypes: {
            players: React.PropTypes.array
        }

Get items will loop through our players saving on a array PlayerItems components. We will send key and index to connect our to array of data.

    getItems: function () {
        let items = [],
            i, len = this.props.players.length;

        for (i = 0; i < len; i++) {
            items.push(<PlayerItem key={i} name={this.props.players[i].name} index={i}/>);
        }

        this.counter++;
        return items;
    },
 
###LeaderBoard

Leader board has the same function structure of ClickableArea, but in that case we will call BoardItems instead of call PlayerItems


    




