import type { BuildSort } from "~/db/tables";
import type * as BuildRepository from "~/features/builds/BuildRepository.server";
import { type MainWeaponId, modesShort } from "~/modules/in-game-lists";
import { DEFAULT_BUILD_SORT } from "../user-page-constants";

interface SortBuildsArgs {
	builds: Awaited<ReturnType<typeof BuildRepository.allByUserId>>;
	buildSorting: BuildSort[] | null;
	weaponPool: MainWeaponId[];
}

export function sortBuilds({
	builds,
	buildSorting,
	weaponPool,
}: SortBuildsArgs) {
	const sorters: Record<
		BuildSort,
		(
			a: SortBuildsArgs["builds"][number],
			b: SortBuildsArgs["builds"][number],
		) => number
	> = {
		ALPHABETICAL_TITLE: (a, b) => a.title.localeCompare(b.title),
		WEAPON_IN_GAME_ORDER: (a, b) =>
			Math.min(...a.weapons.map((wpn) => wpn.weaponSplId)) -
			Math.min(...b.weapons.map((wpn) => wpn.weaponSplId)),
		UPDATED_AT: (a, b) => b.updatedAt - a.updatedAt,
		HEADGEAR_ID: (a, b) => a.headGearSplId - b.headGearSplId,
		CLOTHES_ID: (a, b) => a.clothesGearSplId - b.clothesGearSplId,
		SHOES_ID: (a, b) => a.shoesGearSplId - b.shoesGearSplId,
		MODE: (a, b) => {
			const aLowestModeIdx = modesShort.findIndex((mode) =>
				a.modes?.includes(mode),
			);
			const bLowestModeIdx = modesShort.findIndex((mode) =>
				b.modes?.includes(mode),
			);

			if (aLowestModeIdx === -1 && bLowestModeIdx !== -1) return 1;
			if (aLowestModeIdx !== -1 && bLowestModeIdx === -1) return -1;

			return aLowestModeIdx - bLowestModeIdx;
		},
		TOP_500: (a, b) => {
			const aHas = a.weapons.some((wpn) => wpn.maxPower !== null);
			const bHas = b.weapons.some((wpn) => wpn.maxPower !== null);

			if (aHas && !bHas) return -1;
			if (!aHas && bHas) return 1;

			return 0;
		},
		WEAPON_POOL: (a, b) => {
			const aLowestWeaponIdx = weaponPool.findIndex((wp) =>
				a.weapons.map((wpn) => wpn.weaponSplId).includes(wp),
			);
			const bLowestWeaponIdx = weaponPool.findIndex((wp) =>
				b.weapons.map((wpn) => wpn.weaponSplId).includes(wp),
			);

			if (aLowestWeaponIdx === -1 && bLowestWeaponIdx !== -1) return 1;
			if (aLowestWeaponIdx !== -1 && bLowestWeaponIdx === -1) return -1;

			return aLowestWeaponIdx - bLowestWeaponIdx;
		},
	};

	return builds.slice().sort((a, b) => {
		for (const sort of buildSorting ?? DEFAULT_BUILD_SORT) {
			const result = sorters[sort](a, b);
			if (result !== 0) return result;
		}

		return 0;
	});
}
