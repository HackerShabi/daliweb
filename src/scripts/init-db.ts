import { AdminModel } from '@/models/Admin';
import { UserModel } from '@/models/User';
import { getDatabase } from '@/lib/mongodb';

/**
 * Database initialization script
 * This script sets up the initial database structure and creates a default super admin
 */

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database...');

    // Get database connection
    const db = await getDatabase();
    console.log('✅ Connected to MongoDB');

    // Create indexes for better performance
    console.log('📊 Creating database indexes...');
    
    // Users collection indexes
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ createdAt: -1 });
    await usersCollection.createIndex({ isActive: 1 });
    console.log('✅ Users collection indexes created');

    // Admins collection indexes
    const adminsCollection = db.collection('admins');
    await adminsCollection.createIndex({ username: 1 }, { unique: true });
    await adminsCollection.createIndex({ email: 1 }, { unique: true });
    await adminsCollection.createIndex({ createdAt: -1 });
    await adminsCollection.createIndex({ isActive: 1 });
    await adminsCollection.createIndex({ role: 1 });
    console.log('✅ Admins collection indexes created');

    // Quotes collection indexes
    const quotesCollection = db.collection('quotes');
    await quotesCollection.createIndex({ createdAt: -1 });
    await quotesCollection.createIndex({ status: 1 });
    await quotesCollection.createIndex({ email: 1 });
    console.log('✅ Quotes collection indexes created');

    // Demos collection indexes
    const demosCollection = db.collection('demos');
    await demosCollection.createIndex({ createdAt: -1 });
    await demosCollection.createIndex({ status: 1 });
    await demosCollection.createIndex({ email: 1 });
    await demosCollection.createIndex({ preferredDate: 1 });
    console.log('✅ Demos collection indexes created');

    // Packages collection indexes
    const packagesCollection = db.collection('packages');
    await packagesCollection.createIndex({ createdAt: -1 });
    await packagesCollection.createIndex({ status: 1 });
    await packagesCollection.createIndex({ email: 1 });
    await packagesCollection.createIndex({ packageName: 1 });
    console.log('✅ Packages collection indexes created');

    // Create default super admin if none exists
    console.log('👤 Checking for existing super admin...');
    const existingSuperAdmin = await AdminModel.createDefaultSuperAdmin();
    
    if (existingSuperAdmin) {
      console.log('✅ Default super admin created successfully');
      console.log('📋 Super Admin Credentials:');
      console.log('   Username: superadmin');
      console.log('   Password: DaliWeb2024!');
      console.log('   ⚠️  Please change the password after first login!');
    } else {
      console.log('ℹ️  Super admin already exists, skipping creation');
    }

    // Create some sample users for testing (optional)
    console.log('👥 Creating sample users...');
    try {
      await UserModel.create({
        email: 'john.doe@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        company: 'Example Corp'
      });
      console.log('✅ Sample user John Doe created');
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Sample user John Doe already exists');
      } else {
        console.log('⚠️  Could not create sample user:', error.message);
      }
    }

    try {
      await UserModel.create({
        email: 'jane.smith@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1987654321',
        company: 'Tech Solutions Inc'
      });
      console.log('✅ Sample user Jane Smith created');
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Sample user Jane Smith already exists');
      } else {
        console.log('⚠️  Could not create sample user:', error.message);
      }
    }

    console.log('🎉 Database initialization completed successfully!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Set up your .env file with MONGODB_URI');
    console.log('2. Login to admin panel with super admin credentials');
    console.log('3. Change the default super admin password');
    console.log('4. Create additional admin accounts as needed');
    console.log('');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Run the initialization if this script is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('✅ Initialization script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Initialization script failed:', error);
      process.exit(1);
    });
}

export { initializeDatabase };