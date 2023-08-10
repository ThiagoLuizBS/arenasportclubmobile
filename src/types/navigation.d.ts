export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Profile: undefined;
      Championship: { championshipId: string };
      Match: { matchId: string };
      Team: { teamId: string };
      Favorites: undefined;
      News: undefined;
      Discover: undefined;
      Settings: undefined;
      Search: undefined;
      SignUp: undefined;
      SignIn: undefined;
    }
  }
}
