// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css'
import 'bootstrap/dist/css/bootstrap.css'

// Import libraries we need.
import {
  default as Web3
} from 'web3'
import {
  default as contract
} from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import cryptoValentineArtifacts from '../../build/contracts/CryptoValentine.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var CryptoValentine = contract(cryptoValentineArtifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts
var account

window.App = {
  start: function () {
    var self = this
    console.log("app.js started");
    // Bootstrap the MetaCoin abstraction for Use.
    CryptoValentine.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]

      //App.sendMessage()
      App.getNumberOfLocks();
      App.getLocks();

    })
  },
  sendMessage: function () {
    var _message = document.getElementById('message').value

    CryptoValentine.deployed().then(function (instance) {
      console.log("test")
      return instance.setText(_message, {
        from: accounts[0],
        gas: 4000000,
        amount: 0.002
      })
    }).then(function (result) {
      console.log(result)
    }).catch(function (err) {
      console.error(err)
    })
  },
  getNumberOfLocks: function ()  {
    CryptoValentine.deployed().then(function (instance) {
      console.log("haha");
      console.log(instance.getNumberOfLoveLocks());
    })
  },
  getLocks: function () {
    CryptoValentine.deployed().then(function (instance) {
      console.log("test")
      console.log(instance.getLoveLocks())
      /*let messages = instance.getLoveLocks();
      messages.map((item,index)=>{
        messages[index] = cleanStr(web3.toAscii(item));
      })
      return messages;*/

      return instance.getLoveLocks()
      /*
      instance.getLoveLocks().then((data)=>{
        let messages = data[0];
        console.log(messages)
      })*/
    }).then(function (result) {
      console.log(result)
    }).catch(function (err) {
      console.error(err)
    })
  },
  sendCoin: function () {
    var self = this
  }/*,
  render() {
  
    return (
        <h1> TEstsdftsdtftsdftsdftsdttfds </h1>  
    );
  }*/
}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  App.start()
})


