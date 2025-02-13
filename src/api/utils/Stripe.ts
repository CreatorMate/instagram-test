import Stripe from "stripe";
// @ts-ignore
import {useRuntimeConfig} from "#imports";
export const stripe = new Stripe(useRuntimeConfig().STRIPE_SECRET_KEY);