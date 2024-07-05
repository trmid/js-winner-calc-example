<script lang="ts">
  import { computeWinners } from "@generationsoftware/tevm-winner-calc"
  
  type Address = `0x${string}`

  const ptlistApi = `https://api.ptlist.xyz/`
  const chains: Record<number, { name: string, prizePool: Address, rpcUrl: string }> = {
    10: {
      name: "Optimism",
      prizePool: "0xF35fE10ffd0a9672d0095c435fd8767A7fe29B55",
      rpcUrl: "https://mainnet.optimism.io/"
    },
    8453: {
      name: "Base",
      prizePool: "0x45b2010d8a4f08b53c9fa7544c51dfd9733732cb",
      rpcUrl: "https://mainnet.base.org"
    },
    42161: {
      name: "Arbitrum",
      prizePool: "0x52e7910c4c287848c8828e8b17b8371f4ebc5d42",
      rpcUrl: "https://1rpc.io/arb"
    }
  }

  let user: Address
  let checked: string = "nope"
  let checking = false;
  let wins: {
    chainId: number
    vault: {
      address: Address,
      name: string,
      symbol: string
    },
    prizes: Record<number, number[]>
  }[] = []
  
  const checkWins = async () => {
    checking = true
    checked = user
    wins = []
    try {
      const vaultListRes = await fetch(`${ptlistApi}${user}`)
      const vaultList = await vaultListRes.json()
      console.log(JSON.stringify(vaultList, null, ' '))
      for (const vault of vaultList.tokens) {
        if (chains[vault.chainId]) {
          const winners = await computeWinners({
            chainId: vault.chainId,
            rpcUrl: chains[vault.chainId].rpcUrl,
            prizePoolAddress: chains[vault.chainId].prizePool,
            vaultAddress: vault.address,
            userAddresses: [user],
            ignoreCanaries: true
          })
          if (winners.length > 0) {
            wins.push({
              chainId: vault.chainId,
              vault,
              prizes: winners[0].prizes
            })
          }
        }
      }
    } catch(err) {
      console.log(err)
      alert("Whoops, something went wrong...")
    } finally {
      checking = false
    }
  };
</script>

<div>
  <input type="text" name="addressToCheck" bind:value={user} placeholder="User (0x0123...)">
  <button on:click={checkWins} disabled={checking}>Check Wins</button>
  {#if wins.length > 0}
    <h3>Wins Found!</h3>
    <table id="wins">
      <tr>
        <th>Chain</th>
        <th>Vault</th>
        <th>Vault Address</th>
        <th>Tier</th>
        <th>Prize Indices</th>
      </tr>
      {#each wins as win}
        {#each Object.entries(win.prizes) as [tier, indices]}
          <tr>
            <td>{chains[win.chainId].name}</td>
            <td>{win.vault.symbol}</td>
            <td>{win.vault.address}</td>
            <td>{tier}</td>
            <td>{indices.join(",")}</td>
          </tr>
        {/each}
      {/each}
    </table>
  {:else if !checking && checked === user}
    <h3>No wins today...</h3>
  {/if}
  {#if checking}
    <h3>Checking for wins...</h3>
  {/if}
</div>

<style>
  #wins {
    margin-top: 1rem;
    border: 1px solid;
  }
  td, th {
    padding: 0.5rem;
    text-align: left;
  }
  input, button {
    padding: 0.5rem;
  }
</style>