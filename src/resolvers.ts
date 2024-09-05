import { supabase } from "./index";
import { User } from "./types";

export const resolvers = {
  Query: {
    getUser: async (
      _: any,
      { email }: { email: string }
    ): Promise<User | null> => {
      try {
        //fetch user details
        const { data, error } = await supabase
          .from("users")
          .select("id, email, coins")
          .eq("email", email)
          .single();

        if (error) {
          console.error(`Error fetching user: ${error.message}`);
          throw new Error(`User not found or error occurred: ${error.message}`);
        }

        if (!data) {
          console.warn(`No user found with email: ${email}`);
          return null;
        }

        return data;
      } catch (error) {
        console.error(`Error in getUser resolver: ${(error as Error).message}`);
        throw new Error(
          "An unexpected error occurred while fetching the user."
        );
      }
    },
  },

  Mutation: {
    tapCoin: async (_: any, { email }: { email: string }): Promise<string> => {
      console.log("email,", email);
      try {
        // Fetch current coins
        const { data, error } = await supabase
          .from("users")
          .select("coins")
          .eq("email", email)
          .single();

        if (error && error.code !== "PGRST116") {
          // Ignore `PGRST116` error which means no rows found
          console.error(`Error fetching coins: ${error.message}`);
          throw new Error(`Unable to fetch coins: ${error.message}`);
        }

        // If user does not exist, insert new user with initial coins
        if (!data) {
          const { error: insertError } = await supabase
            .from("users")
            .insert([{ email: email, coins: 1 }]);

          if (insertError) {
            console.error(`Error inserting new user: ${insertError.message}`);
            throw new Error(
              `Unable to insert new user: ${insertError.message}`
            );
          }

          return "New user created and coin count set to 1.";
        }

        // User exists, update coin count
        const newCoins = data.coins + 1;

        // Update coins
        const { error: updateError } = await supabase
          .from("users")
          .update({ coins: newCoins })
          .eq("email", email)
          .single();

        if (updateError) {
          console.error(`Error updating coins: ${updateError.message}`);
          throw new Error(`Unable to update coins: ${updateError.message}`);
        }

        // Return success message
        return "Coin count updated successfully.";
      } catch (error) {
        console.error(`Error in tapCoin resolver: ${(error as Error).message}`);
        throw new Error(
          "An unexpected error occurred while updating the coin count."
        );
      }
    },
  },
};
