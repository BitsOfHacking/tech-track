import dbConnect from "../dbConnect";
import Plan from "../models/Plan";
import { IPlan } from "../models/Plan";

export async function getUserPlans(user_id: string): Promise<{
    error?: string;
    data: Array<IPlan>;
}> {
    try {
        await dbConnect();
        const plans: Array<IPlan> = await Plan.find({ user: user_id });
        return {
            data: plans,
        };
    } catch (error: any) {
        return { error: error.message, data: [] }; 
    }
}

export async function createPlan(user_id: string, plan: IPlan): Promise<{
    error?: string;
    data?: IPlan;
}> {
    try {
        await dbConnect();
        const newPlan = await Plan.create({ ...plan, user: user_id });
        return { data: newPlan };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getPlan(plan_id: string): Promise<{
    error?: string;
    data?: IPlan;
}> {
    try {
        await dbConnect();
        const plan = await Plan.findById(plan_id);
        return { data: plan };
    } catch (error: any) {
        return { error: error.message };
    }
}