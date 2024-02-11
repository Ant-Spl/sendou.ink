import type { Storage } from "./types";

export class Delete {
  private readonly storage: Storage;

  /**
   * Creates an instance of Delete, which will handle cleanly deleting data in the storage.
   *
   * @param storage The implementation of Storage.
   */
  constructor(storage: Storage) {
    this.storage = storage;
  }

  /**
   * Deletes a stage, and all its components:
   *
   * - Groups
   * - Rounds
   * - Matches
   * - Match games
   *
   * @param stageId ID of the stage.
   */
  public stage(stageId: number): void {
    // The order is important here, because the abstract storage can possibly have foreign key checks (e.g. SQL).

    if (!this.storage.delete("match", { stage_id: stageId }))
      throw Error("Could not delete matches.");

    if (!this.storage.delete("round", { stage_id: stageId }))
      throw Error("Could not delete rounds.");

    if (!this.storage.delete("group", { stage_id: stageId }))
      throw Error("Could not delete groups.");

    if (!this.storage.delete("stage", { id: stageId }))
      throw Error("Could not delete the stage.");
  }

  /**
   * Deletes **the stages** of a tournament (and all their components, see {@link stage | delete.stage()}).
   *
   * You are responsible for deleting the tournament itself.
   *
   * @param tournamentId ID of the tournament.
   */
  public tournament(tournamentId: number): void {
    const stages = this.storage.select("stage", {
      tournament_id: tournamentId,
    });
    if (!stages) throw Error("Error getting the stages.");

    for (const stage of stages) this.stage(stage.id);
  }
}
