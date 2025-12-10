-- Migration: Update player_data trigger to sync all fields
-- Date: 2025-12-10
-- Description: Drops and recreates the trigger to sync all tracking fields

USE arcane_angler;

-- Drop existing trigger
DROP TRIGGER IF EXISTS after_player_data_update;

-- Recreate trigger with all fields
DELIMITER $$
CREATE TRIGGER after_player_data_update
AFTER UPDATE ON player_data
FOR EACH ROW
BEGIN
    UPDATE leaderboard_stats
    SET
        level = NEW.level,
        total_gold = NEW.gold,
        total_relics = NEW.relics,
        highest_biome = NEW.current_biome,
        total_fish_caught = COALESCE(NEW.total_fish_caught, 0),
        total_casts = COALESCE(NEW.total_casts, 0),
        fish_sold = COALESCE(NEW.total_fish_sold, 0),
        gold_earned = COALESCE(NEW.total_gold_earned, 0),
        relics_earned = COALESCE(NEW.total_relics_earned, 0),
        common_caught = COALESCE(NEW.commons_caught, 0),
        uncommon_caught = COALESCE(NEW.uncommons_caught, 0),
        fine_caught = COALESCE(NEW.fines_caught, 0),
        rare_caught = COALESCE(NEW.rares_caught, 0),
        epic_caught = COALESCE(NEW.epics_caught, 0),
        legendary_fish_count = COALESCE(NEW.legendaries_caught, 0),
        mythic_fish_count = COALESCE(NEW.mythics_caught, 0),
        exotic_caught = COALESCE(NEW.exotics_caught, 0),
        arcane_caught = COALESCE(NEW.arcanes_caught, 0),
        treasure_caught = COALESCE(NEW.treasure_chests_found, 0),
        total_stats_upgraded = COALESCE(NEW.stats_upgraded, 0)
    WHERE user_id = NEW.user_id;
END$$
DELIMITER ;
