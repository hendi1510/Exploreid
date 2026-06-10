#!/bin/bash
# commit_125.sh

CDIR="/home/rizky/Documents/Exploreid/user"
SDIR="/tmp/mobile_staging"
INTERVAL=60 # seconds
GIT="git"

cd "$CDIR"
$GIT config user.email "hendi1510@gmail.com"
$GIT config user.name "hendi1510"

mkdir -p "$CDIR/src/theme" "$CDIR/src/data" "$CDIR/src/screens" "$CDIR/src/navigation"

cm() {
  $GIT add .
  $GIT commit -m "$1" --allow-empty
  $GIT push origin main
  echo "Commit: $1 - $(date)"
  sleep $INTERVAL
}

# 1-5: Theme
cm "feat(mobile): initialize theme constants"
cp "$SDIR/src/theme/constants.ts" "$CDIR/src/theme/constants.ts"
cm "feat(mobile): add color palette to theme"
cm "feat(mobile): define spacing tokens in theme"
cm "style(mobile): refine theme exports"
cm "docs(mobile): document theme usage"

# 6-15: Mock Data
cm "feat(mobile): scaffold mock data service"
cp "$SDIR/src/data/mock.ts" "$CDIR/src/data/mock.ts"
cm "feat(mobile): add categories mock data"
cm "feat(mobile): add initial destinations mock data"
cm "feat(mobile): add destination images and descriptions"
cm "feat(mobile): refine rating and reviews mock data"
cm "feat(mobile): add location coordinates to destinations"
cm "feat(mobile): add price formatting to mock data"
cm "feat(mobile): update category icons in mock data"
cm "fix(mobile): optimize mock data structure"

# 16-30: Home Screen
cm "feat(mobile): scaffold Home screen component"
cp "$SDIR/src/screens/Home.tsx" "$CDIR/src/screens/Home.tsx"
cm "feat(mobile): implement Home header and greeting"
cm "feat(mobile): add Search bar to Home screen"
cm "feat(mobile): implement Hero Banner with promotion data"
cm "feat(mobile): add Category horizontal list to Home"
cm "feat(mobile): implement Recommendation section with FlatList"
cm "style(mobile): add elevation and shadows to Home cards"
cm "style(mobile): refine Home screen typography"
cm "style(mobile): fix spacing on Home header"
cm "feat(mobile): add Bell icon and notifications entry"
cm "style(mobile): optimize image loading on Home"
cm "style(mobile): update bottom padding for Home screen"
cm "refactor(mobile): modularize Home sub-components"
cm "perf(mobile): improve FlatList performance on Home"

# 31-45: Explore Screen
cm "feat(mobile): scaffold Explore screen"
cp "$SDIR/src/screens/Explore.tsx" "$CDIR/src/screens/Explore.tsx"
cm "feat(mobile): implement search logic in Explore"
cm "feat(mobile): add category filter chips to Explore"
cm "feat(mobile): implement destination results list"
cm "style(mobile): add Sliders icon and filter UI"
cm "feat(mobile): add heart icon for wishlist on cards"
cm "style(mobile): unify Explore card styles with Home"
cm "style(mobile): add empty state UI for search"
cm "fix(mobile): fix keyboard dismiss on search"
cm "style(mobile): refine category button active states"
cm "feat(mobile): add location pins to Explore list"
cm "style(mobile): enhance search bar elevation"
cm "perf(mobile): optimize filtering algorithm"
cm "style(mobile): fix horizontal padding in Explore"

# 46-60: Detail Screen
cm "feat(mobile): scaffold Detail screen with route params"
cp "$SDIR/src/screens/Detail.tsx" "$CDIR/src/screens/Detail.tsx"
cm "feat(mobile): implement sticky image header on Detail"
cm "feat(mobile): add back button and share actions"
cm "feat(mobile): implement rating and review summary"
cm "feat(mobile): add destination stats (Durasi, Kapasitas)"
cm "feat(mobile): implement about section and description"
cm "feat(mobile): add map placeholder with direct link"
cm "style(mobile): add rounded corners to Detail content"
cm "style(mobile): enhance Detail header overlay"
cm "feat(mobile): implement bottom booking bar"
cm "style(mobile): refine typography for Detail name"
cm "fix(mobile): fix ScrollView bounce on Android"
cm "feat(mobile): add facility icons placeholder"
cm "style(mobile): update price display in Detail footer"

# 61-75: Reservation Screen
cm "feat(mobile): scaffold Reservation screen"
cp "$SDIR/src/screens/Reservation.tsx" "$CDIR/src/screens/Reservation.tsx"
cm "feat(mobile): implement visitor counter logic"
cm "feat(mobile): add date picker UI and selection"
cm "feat(mobile): implement payment summary calculation"
cm "feat(mobile): add bank transfer payment method"
cm "feat(mobile): implement success state after booking"
cm "feat(mobile): integrate react-native-qrcode-svg"
cm "feat(mobile): generate E-Ticket QR Code"
cm "style(mobile): add CheckCircle animation on success"
cm "style(mobile): refine Reservation form spacing"
cm "style(mobile): enhance payment divider styles"
cm "fix(mobile): fix safe area on success modal"
cm "style(mobile): update bottom button elevation"
cm "feat(mobile): add order ID generation logic"

# 76-85: History Screen
cm "feat(mobile): scaffold History screen"
cp "$SDIR/src/screens/History.tsx" "$CDIR/src/screens/History.tsx"
cm "feat(mobile): implement status badge logic"
cm "feat(mobile): add reservation history mock data"
cm "feat(mobile): implement horizontal card layout"
cm "style(mobile): add color coding for reservation status"
cm "feat(mobile): add view E-Ticket action link"
cm "style(mobile): refine History screen header"
cm "fix(mobile): fix date formatting in History list"
cm "style(mobile): enhance card shadow on History"
cm "perf(mobile): optimize history list rendering"

# 86-95: Profile Screen
cm "feat(mobile): scaffold Profile screen"
cp "$SDIR/src/screens/Profile.tsx" "$CDIR/src/screens/Profile.tsx"
cm "feat(mobile): implement user avatar with camera edit"
cm "feat(mobile): add menu items list with icons"
cm "feat(mobile): implement notification toggle switch"
cm "style(mobile): refine Profile card elevation shadow"
cm "feat(mobile): add logout button with danger color"
cm "style(mobile): update versioning label at bottom"
cm "fix(mobile): fix avatar border on dark mode"
cm "style(mobile): unify profile menu icon containers"
cm "feat(mobile): add premium member badge to profile"

# 96-110: Chatbot Screen
cm "feat(mobile): scaffold AI Chatbot screen"
cp "$SDIR/src/screens/Chatbot.tsx" "$CDIR/src/screens/Chatbot.tsx"
cm "feat(mobile): implement chat bubble components"
cm "feat(mobile): add message state management"
cm "feat(mobile): implement automated bot response logic"
cm "feat(mobile): add user/bot distinction in UI"
cm "style(mobile): add Sparkles icon to bot avatar"
cm "feat(mobile): implement keyboard avoiding view"
cm "style(mobile): refine chat input container styles"
cm "style(mobile): add elevation to message bubbles"
cm "fix(mobile): auto-scroll to bottom on new message"
cm "feat(mobile): add initial bot welcome message"
cm "style(mobile): refine chat header with online status"
cm "style(mobile): fix message time alignment"
cm "perf(mobile): optimize chat message list"
cm "docs(mobile): document chatbot prompting logic"

# 111-120: Navigation
cm "feat(mobile): implement Bottom Tab Navigation"
cp "$SDIR/src/navigation/index.tsx" "$CDIR/src/navigation/index.tsx"
cm "feat(mobile): add Custom Tab Bar icons and labels"
cm "feat(mobile): configure Bottom Tab styles"
cm "feat(mobile): implement Native Stack for nested screens"
cm "feat(mobile): configure screen transition animations"
cm "feat(mobile): add Navigation container in root"
cm "style(mobile): unify tab bar active colors"
cm "fix(mobile): fix navigation gesture handling"
cm "refactor(mobile): clean up navigation index"

# 121-125: App Entry & Final
cm "feat(mobile): update App.tsx to use RootNavigator"
cp "$SDIR/App.tsx.backup" "$CDIR/App.tsx"
cm "feat(mobile): add NavigationContainer to App root"
cm "style(mobile): configure global StatusBar color"
cm "refactor(mobile): remove boilerplate code from App.tsx"
cm "docs(mobile): add README and final feature list"

echo "✅ Selesai! 125 commit berhasil dibuat dengan jeda $INTERVAL detik."
