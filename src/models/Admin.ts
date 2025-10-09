import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getAdminsCollection } from '@/lib/mongodb';

export interface Admin {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  createdBy?: ObjectId;
}

export interface CreateAdminData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'admin' | 'super_admin';
  permissions?: string[];
  createdBy?: ObjectId;
}

export interface AdminLoginData {
  username: string;
  password: string;
}

// Default permissions for different admin roles
export const DEFAULT_PERMISSIONS = {
  admin: [
    'view_dashboard',
    'view_quotes',
    'view_demos',
    'view_packages',
    'update_submissions',
    'view_users'
  ],
  super_admin: [
    'view_dashboard',
    'view_quotes',
    'view_demos',
    'view_packages',
    'update_submissions',
    'view_users',
    'manage_users',
    'view_admins',
    'manage_admins',
    'system_settings'
  ]
};

export class AdminModel {
  static async create(adminData: CreateAdminData): Promise<Admin> {
    const collection = await getAdminsCollection();
    
    // Check if admin already exists
    const existingAdmin = await collection.findOne({ 
      $or: [
        { username: adminData.username },
        { email: adminData.email }
      ]
    });
    
    if (existingAdmin) {
      throw new Error('Admin with this username or email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    const role = adminData.role || 'admin';
    const permissions = adminData.permissions || DEFAULT_PERMISSIONS[role];

    const admin: Omit<Admin, '_id'> = {
      ...adminData,
      password: hashedPassword,
      role,
      permissions,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(admin);
    return { ...admin, _id: result.insertedId };
  }

  static async findByUsername(username: string): Promise<Admin | null> {
    const collection = await getAdminsCollection();
    return await collection.findOne({ username }) as Admin | null;
  }

  static async findByEmail(email: string): Promise<Admin | null> {
    const collection = await getAdminsCollection();
    return await collection.findOne({ email }) as Admin | null;
  }

  static async findById(id: string | ObjectId): Promise<Admin | null> {
    const collection = await getAdminsCollection();
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId }) as Admin | null;
  }

  static async authenticate(loginData: AdminLoginData): Promise<Admin | null> {
    const admin = await this.findByUsername(loginData.username);
    if (!admin || !admin.isActive) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, admin.password);
    if (!isPasswordValid) {
      return null;
    }

    // Update last login
    await this.updateLastLogin(admin._id!);
    
    return admin;
  }

  static async updateLastLogin(adminId: ObjectId): Promise<void> {
    const collection = await getAdminsCollection();
    await collection.updateOne(
      { _id: adminId },
      { 
        $set: { 
          lastLogin: new Date(),
          updatedAt: new Date()
        }
      }
    );
  }

  static async updateAdmin(adminId: string | ObjectId, updateData: Partial<Admin>): Promise<boolean> {
    const collection = await getAdminsCollection();
    const objectId = typeof adminId === 'string' ? new ObjectId(adminId) : adminId;
    
    // If password is being updated, hash it
    if (updateData.password) {
      const saltRounds = 12;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }
    
    const result = await collection.updateOne(
      { _id: objectId },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      }
    );

    return result.modifiedCount > 0;
  }

  static async deleteAdmin(adminId: string | ObjectId): Promise<boolean> {
    const collection = await getAdminsCollection();
    const objectId = typeof adminId === 'string' ? new ObjectId(adminId) : adminId;
    
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  static async getAllAdmins(limit: number = 50, skip: number = 0): Promise<Admin[]> {
    const collection = await getAdminsCollection();
    return await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray() as Admin[];
  }

  static async getAdminsCount(): Promise<number> {
    const collection = await getAdminsCollection();
    return await collection.countDocuments();
  }

  static async hasPermission(adminId: string | ObjectId, permission: string): Promise<boolean> {
    const admin = await this.findById(adminId);
    return admin ? admin.permissions.includes(permission) : false;
  }

  static async createDefaultSuperAdmin(): Promise<Admin | null> {
    try {
      // Check if any super admin exists
      const collection = await getAdminsCollection();
      const existingSuperAdmin = await collection.findOne({ role: 'super_admin' });
      
      if (existingSuperAdmin) {
        return null; // Super admin already exists
      }

      // Create default super admin
      const defaultSuperAdmin: CreateAdminData = {
        username: 'superadmin',
        email: 'admin@daliweb.com',
        password: 'DaliWeb2024!', // Should be changed on first login
        firstName: 'Super',
        lastName: 'Admin',
        role: 'super_admin'
      };

      return await this.create(defaultSuperAdmin);
    } catch (error) {
      console.error('Error creating default super admin:', error);
      return null;
    }
  }
}