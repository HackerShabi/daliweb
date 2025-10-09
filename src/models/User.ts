import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getUsersCollection } from '@/lib/mongodb';

export interface ActivityEntry {
  action: string;
  category?: string;
  timestamp: Date;
  details?: any;
}

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  role: 'client';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  selectedCategory?: string;
  activity?: ActivityEntry[];
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export class UserModel {
  static async create(userData: CreateUserData): Promise<User> {
    const collection = await getUsersCollection();
    
    // Check if user already exists
    const existingUser = await collection.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user: Omit<User, '_id'> = {
      ...userData,
      password: hashedPassword,
      selectedCategory: undefined,
      activity: [],
      role: 'client',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async findByEmail(email: string): Promise<User | null> {
    const collection = await getUsersCollection();
    return await collection.findOne({ email }) as User | null;
  }

  static async findById(id: string | ObjectId): Promise<User | null> {
    const collection = await getUsersCollection();
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId }) as User | null;
  }

  static async authenticate(loginData: UserLoginData): Promise<User | null> {
    const user = await this.findByEmail(loginData.email);
    if (!user || !user.isActive) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Update last login
    await this.updateLastLogin(user._id!);
    
    return user;
  }

  static async updateLastLogin(userId: ObjectId): Promise<void> {
    const collection = await getUsersCollection();
    await collection.updateOne(
      { _id: userId },
      { 
        $set: { 
          lastLogin: new Date(),
          updatedAt: new Date()
        }
      }
    );
  }

  static async updateUser(userId: string | ObjectId, updateData: Partial<User>): Promise<boolean> {
    const collection = await getUsersCollection();
    const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
    
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

  static async deleteUser(userId: string | ObjectId): Promise<boolean> {
    const collection = await getUsersCollection();
    const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
    
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  static async getAllUsers(limit: number = 50, skip: number = 0): Promise<User[]> {
    const collection = await getUsersCollection();
    return await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray() as User[];
  }

  static async getUsersCount(): Promise<number> {
    const collection = await getUsersCollection();
    return await collection.countDocuments();
  }
}