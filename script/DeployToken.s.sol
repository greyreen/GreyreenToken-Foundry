// script/DeployToken.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Foundry'nin dağıtım scriptleri için gerekli import
import {Script} from "forge-std/Script.sol"; 
import {GreyreenToken} from "../src/GreyreenToken.sol";
import {console} from "forge-std/console.sol"; 

contract DeployTokenScript is Script {
    function run() public returns (GreyreenToken) {
        // Özel anahtarı komut satırından alması için startBroadcast() kullanıldı.
        vm.startBroadcast(); 

        GreyreenToken token = new GreyreenToken();

        vm.stopBroadcast();

        console.log("GreyreenToken Deployed to:", address(token));

        return token;
    }
}