// src/GreyreenToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import'lar doğru Foundry yapısındadır
import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract GreyreenToken is ERC20, Ownable {
    // 1 milyon token arzı (18 ondalık basamakla)
    uint256 private constant INITIAL_SUPPLY = 1000000 * 10**18; 

    constructor() 
        ERC20("Greyreen Token", "GRT") 
        Ownable(msg.sender)
    {
        // Başlangıç arzını sözleşme sahibine gönder
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Sahibin (Owner) yeni token basma yetkisi
    // DÜZELTME: Foundry testlerinin çağırabilmesi için external yapıldı.
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Token yakma (Burn) fonksiyonu
    // Düzeltme: public yerine external yapıldı (Foundry uyumluluğu için)
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}