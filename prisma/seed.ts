import { PrismaClient } from '@prisma/client';
import { PlaceHolderImages } from '../src/lib/placeholder-images';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clean up existing data
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.marketTicker.deleteMany();
  console.log('Cleaned up existing data.');

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Satoshi Nakamoto',
      email: 'satoshi@gmx.com',
      image: `https://i.pravatar.cc/150?u=satoshi`,
    },
  });
  console.log('Created users.');

  // Create Categories
  const bitcoinCategory = await prisma.category.create({
    data: { name: 'Bitcoin', color: '#F7931A' },
  });
  const defiCategory = await prisma.category.create({
    data: { name: 'DeFi', color: '#6A11CB' },
  });
  const altcoinsCategory = await prisma.category.create({
    data: { name: 'Altcoins', color: '#00D1C7' },
  });
  const regulationCategory = await prisma.category.create({
    data: { name: 'Regulation', color: '#D44A4A' },
  });
  console.log('Created categories.');

  // Create Posts
  const postsData = [
    {
      title: 'Bitcoin Hits New All-Time High Amidst Market Frenzy',
      slug: 'bitcoin-hits-new-all-time-high',
      excerpt: 'Bitcoin has shattered its previous records, reaching a staggering new all-time high as institutional interest and retail FOMO propel the cryptocurrency to unprecedented levels.',
      content: '<p>In a landmark event for the cryptocurrency world, Bitcoin (BTC) has surged past its previous all-time high, setting a new record that has the financial markets buzzing. The leading digital asset saw its price climb dramatically over the past 24 hours, fueled by a potent combination of strong institutional buying pressure and heightened excitement from retail investors.</p><p>Analysts point to several key factors driving this historic rally. The recent influx of capital from major corporations and investment funds into Bitcoin has provided a strong vote of confidence, signaling a growing acceptance of cryptocurrency as a legitimate asset class. Additionally, the proliferation of more accessible trading platforms and a wave of positive media coverage have attracted a new generation of investors eager to participate in the digital gold rush.</p><p>This rally is not just a number on a chart; it represents a significant milestone in Bitcoin\'s journey towards mainstream adoption. As the digital currency continues to mature, its impact on the global financial landscape is becoming increasingly undeniable.</p>',
      imageUrl: PlaceHolderImages[0].imageUrl,
      categoryId: bitcoinCategory.id,
      authorId: user1.id,
    },
    {
      title: 'The DeFi Revolution: How Decentralized Finance is Changing the World',
      slug: 'the-defi-revolution',
      excerpt: 'Decentralized Finance (DeFi) is rapidly evolving from a niche concept into a powerful force reshaping traditional financial systems with its principles of transparency and accessibility.',
      content: '<p>Decentralized Finance, or DeFi, is more than just a buzzword; it\'s a burgeoning ecosystem of financial applications built on blockchain technology. By removing intermediaries like banks and brokerages, DeFi aims to create a more open, transparent, and accessible financial system for everyone.</p><p>From lending and borrowing platforms to decentralized exchanges and yield farming protocols, the DeFi space is innovating at a breakneck pace. These protocols allow users to earn interest, trade assets, and access financial services in a permissionless manner, all while maintaining full control over their funds. While the sector is still young and faces challenges such as scalability and security, its potential to democratize finance is immense. As the technology matures, DeFi could very well be the catalyst for the next paradigm shift in the global economy.</p>',
      imageUrl: PlaceHolderImages[1].imageUrl,
      categoryId: defiCategory.id,
      authorId: user1.id,
    },
    {
      title: 'Top 5 Altcoins to Watch in the Coming Bull Run',
      slug: 'top-5-altcoins-to-watch',
      excerpt: 'As the crypto market heats up, several altcoins are positioned for significant growth. Here are the top 5 projects with strong fundamentals and innovative technology to keep on your radar.',
      content: '<p>While Bitcoin often steals the spotlight, the altcoin market is teeming with promising projects that could offer substantial returns in the next bull cycle. Here are five altcoins that stand out due to their unique value propositions, strong development teams, and growing ecosystems:</p><ol><li><strong>Ethereum (ETH):</strong> As the backbone of DeFi and NFTs, Ethereum\'s upcoming upgrades promise to enhance scalability and reduce fees, solidifying its position as the leading smart contract platform.</li><li><strong>Solana (SOL):</strong> Known for its high throughput and low transaction costs, Solana continues to attract developers and projects, making it a major contender in the layer-1 race.</li><li><strong>Cardano (ADA):</strong> With its research-driven approach and focus on sustainability and scalability, Cardano is steadily building a robust ecosystem of dApps.</li><li><strong>Polkadot (DOT):</strong> Its interoperability protocol allows different blockchains to connect and communicate, creating a truly decentralized web.</li><li><strong>Chainlink (LINK):</strong> As the leading decentralized oracle network, Chainlink is crucial for connecting smart contracts with real-world data, an essential component for many DeFi applications.</li></ol><p>These projects represent just a fraction of the innovation happening in the altcoin space. As always, investors should conduct their own thorough research before making any investment decisions.</p>',
      imageUrl: PlaceHolderImages[2].imageUrl,
      categoryId: altcoinsCategory.id,
      authorId: user1.id,
    },
    {
      title: 'Governments Worldwide Grapple with Crypto Regulation',
      slug: 'governments-grapple-with-crypto-regulation',
      excerpt: 'As cryptocurrencies become more mainstream, governments and financial regulators around the globe are racing to establish clear frameworks to manage the risks and opportunities of digital assets.',
      content: '<p>The rapid ascent of the cryptocurrency market has not gone unnoticed by global policymakers. From Washington to Beijing, governments are actively debating and formulating regulatory approaches to the digital asset industry. The core challenge lies in balancing the need to protect consumers and maintain financial stability with the desire to foster innovation in this dynamic sector.</p><p>Some countries have embraced cryptocurrencies with open arms, creating favorable regulations to attract talent and investment. Others have taken a more cautious or even restrictive stance, citing concerns over illicit activities and market volatility. The resulting patchwork of regulations creates a complex and often uncertain environment for crypto businesses and investors. However, the ongoing dialogue and development of clearer rules are seen by many as a necessary step towards the long-term legitimacy and stability of the crypto economy.</p>',
      imageUrl: PlaceHolderImages[3].imageUrl,
      categoryId: regulationCategory.id,
      authorId: user1.id,
    },
     {
      title: 'The Rise of NFTs: More Than Just Digital Art',
      slug: 'the-rise-of-nfts',
      excerpt: 'Non-Fungible Tokens (NFTs) have exploded in popularity, but their potential extends far beyond digital collectibles into gaming, identity, and real-world asset tokenization.',
      content: '<p>Non-Fungible Tokens (NFTs) captured the world\'s imagination with multi-million dollar sales of digital art. However, the underlying technology of unique, verifiable digital ownership has applications that reach far beyond the art world. NFTs are poised to revolutionize various industries by providing a secure and transparent way to prove ownership of both digital and physical assets.</p><p>In the gaming sector, NFTs allow players to truly own their in-game items and trade them on open marketplaces. In the realm of identity, they can represent credentials, certifications, and personal records. Furthermore, the tokenization of real-world assets like real estate and intellectual property could unlock trillions of dollars in illiquid value, making these assets more accessible and transferable. While the hype may have cooled, the foundational technology of NFTs continues to be one of the most exciting and transformative aspects of the blockchain space.</p>',
      imageUrl: PlaceHolderImages[4].imageUrl,
      categoryId: altcoinsCategory.id,
      authorId: user1.id,
    },
  ];

  for (const post of postsData) {
    await prisma.post.create({ data: post });
  }
  console.log('Created posts.');

  // Create Market Tickers
  await prisma.marketTicker.createMany({
    data: [
      { symbol: 'BTC', price_usd: 68123.45, change_24h: 2.5 },
      { symbol: 'ETH', price_usd: 3543.21, change_24h: 1.8 },
      { symbol: 'SOL', price_usd: 165.78, change_24h: -3.2 },
      { symbol: 'BNB', price_usd: 598.50, change_24h: 0.5 },
      { symbol: 'XRP', price_usd: 0.52, change_24h: -1.1 },
      { symbol: 'DOGE', price_usd: 0.16, change_24h: 5.7 },
      { symbol: 'ADA', price_usd: 0.45, change_24h: 2.1 },
      { symbol: 'AVAX', price_usd: 36.90, change_24h: -4.5 },
    ],
  });
  console.log('Created market tickers.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
