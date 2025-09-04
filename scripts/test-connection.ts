import { prisma } from "@/lib/database"

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Conexão com o MySQL estabelecida com sucesso!");

    // Executar os testes de CRUD
    await testManyToManyOperations();
  } catch (error) {
    console.error("❌ Erro ao conectar com o MySQL:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function testManyToManyOperations() {
  try {
    console.log("\n🎮 Iniciando testes de relacionamento muitos-para-muitos...");

    // Criar usuários de teste
    const user1 = await prisma.user.create({
      data: {
        name: "John Doe",
        nickname: "johndoe",
        email: "john@example.com",
        password: "hashedpassword123"
      }
    });
    console.log("✅ Usuário 1 criado:", user1);

    const user2 = await prisma.user.create({
      data: {
        name: "Jane Smith",
        nickname: "janesmith",
        email: "jane@example.com",
        password: "hashedpassword456"
      }
    });
    console.log("✅ Usuário 2 criado:", user2);

    // Criar jogos
    const game1 = await prisma.game.create({
      data: {
        name: "The Witcher 3",
        genre: "RPG",
        rating: 9
      }
    });
    console.log("✅ Jogo 1 criado:", game1);

    const game2 = await prisma.game.create({
      data: {
        name: "Call of Duty",
        genre: "FPS",
        rating: 8
      }
    });
    console.log("✅ Jogo 2 criado:", game2);

    // Associar usuários aos jogos (relacionamento muitos-para-muitos)
    // User1 tem ambos os jogos
    await prisma.userGame.create({
      data: {
        userId: user1.id,
        gameId: game1.id
      }
    });
    
    await prisma.userGame.create({
      data: {
        userId: user1.id,
        gameId: game2.id
      }
    });
    
    // User2 tem apenas o game1
    await prisma.userGame.create({
      data: {
        userId: user2.id,
        gameId: game1.id
      }
    });

    console.log("✅ Associações entre usuários e jogos criadas");

    // Buscar usuários com seus jogos
    const usersWithGames = await prisma.user.findMany({
      include: {
        games: {
          include: {
            game: true
          }
        }
      }
    });

    console.log("\n👥 Usuários com seus jogos:");
    usersWithGames.forEach(user => {
      console.log(`\nUsuário: ${user.name} (${user.nickname})`);
      console.log(`Jogos: ${user.games.length}`);
      user.games.forEach(userGame => {
        console.log(`  - ${userGame.game.genre} (Rating: ${userGame.game.rating})`);
      });
    });

    // Buscar jogos com seus usuários
    const gamesWithUsers = await prisma.game.findMany({
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    });

    console.log("\n🎮 Jogos com seus usuários:");
    gamesWithUsers.forEach(game => {
      console.log(`\nJogo: ${game.genre} (Rating: ${game.rating})`);
      console.log(`Usuários: ${game.users.length}`);
      game.users.forEach(userGame => {
        console.log(`  - ${userGame.user.name} (${userGame.user.nickname})`);
      });
    });

    // Limpar dados de teste
    await prisma.userGame.deleteMany({
      where: {
        OR: [
          { userId: user1.id },
          { userId: user2.id }
        ]
      }
    });
    console.log("✅ Associações entre usuários e jogos apagadas");

    await prisma.game.deleteMany({
      where: {
        id: {
          in: [game1.id, game2.id]
        }
      }
    });
    console.log("✅ Jogos de teste apagados");

    await prisma.user.deleteMany({
      where: {
        id: {
          in: [user1.id, user2.id]
        }
      }
    });
    console.log("✅ Usuários de teste apagados");

    console.log("\n🎉 Testes de relacionamento muitos-para-muitos concluídos com sucesso!");

  } catch (error) {
    console.error("❌ Erro durante os testes:", error);
  }
}

// Executar o teste se este arquivo for executado diretamente
if (require.main === module) {
  testConnection();
}

export default testConnection;