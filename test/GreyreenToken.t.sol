// test/GreyreenToken.t.sol
// Foundry test fonksiyonlarını kullanmak için kural:
pragma solidity ^0.8.20; // Hata veren pragma uyarısını giderdik

import {Test} from "forge-std/Test.sol";
import {GreyreenToken} from "../src/GreyreenToken.sol"; // Ana sözleşmemizi doğru yolla import ettik

contract GreyreenTokenTest is Test {
    GreyreenToken public token;

    // Test adresleri ve sabitler
    address public constant ALICE = address(0xAA);
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18;
    uint256 public constant MINT_AMOUNT = 500 * 10**18;
    uint256 public constant TRANSFER_AMOUNT = 100 * 10**18;

    // Her testten önce çalışır (setup)
    function setUp() public {
        // Sözleşmeyi test sahibi olarak (address(this)) dağıt
        token = new GreyreenToken();
    }

    // TEST 1: Başlangıç ve Sahiplik Kontrolü
    function test_InitialSupplyAndOwnership() public view {
        // Sözleşme sahibinin başlangıç arzına sahip olduğunu kontrol et
        assertEq(token.balanceOf(address(this)), INITIAL_SUPPLY, "Owner should have the initial supply.");
        
        // Sözleşme sahibini kontrol et
        assertEq(token.owner(), address(this), "The deployer should be the owner.");
    }

    // TEST 2: Sadece sahip yeni token basabilir (Mint)
    function test_OnlyOwnerCanMint() public {
        // ALICE'e geçiş yaparak mint etmeyi dene
        vm.prank(ALICE);
        // Hata bekliyoruz (Ownable: caller is not the owner)
       // Foundry/OpenZeppelin'in beklediği yeni hata formatı
// OwnableUnauthorizedAccount(adres) hatasını bekliyoruz
vm.expectRevert();
        token.mint(ALICE, MINT_AMOUNT);
        
        // Owner rolüne geri dön ve başarılı mint yap
        vm.prank(address(this));
        token.mint(ALICE, MINT_AMOUNT);
        
        // ALICE'in bakiyesini kontrol et
        assertEq(token.balanceOf(ALICE), MINT_AMOUNT, "Minted amount should be transferred to ALICE.");
    }

    // TEST 3: Transfer İşlemi
    function test_Transfer() public {
        // Owner'dan ALICE'e 100 token gönder
        vm.prank(address(this));
        token.transfer(ALICE, TRANSFER_AMOUNT);
        
        // ALICE'in bakiyesini kontrol et
        assertEq(token.balanceOf(ALICE), TRANSFER_AMOUNT, "ALICE should receive the transferred amount.");
    }
}